import type { Album, ReadingLevel, ReadingText, Sentence } from "../src/lib/types";
import { READING_LEVELS } from "../src/lib/types";
import { allChunks, coverage, rng, sampleSentences, sentenceDistractors, shuffle, totalSentences } from "../src/lib/builder";

interface Env {
  ASSETS: Fetcher;
  AI: Ai;
  ALBUM: KVNamespace;
  NVIDIA_API_KEY?: string;
}

const NVIDIA_MODEL = "deepseek-ai/deepseek-v4-flash-0731";
const NVIDIA_CHAT_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

const MAX_ALBUM_BYTES = 96 * 1024;
const MAX_SPEAK_CHARS = 220;
const SLUG_ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      if (path === "/api/albums" && request.method === "POST") return await createAlbum(request, env);

      const albumMatch = path.match(/^\/api\/albums\/([a-z0-9]{4,24})$/);
      if (albumMatch) {
        if (request.method === "GET") return await readAlbum(albumMatch[1], env);
        if (request.method === "PUT") return await updateAlbum(albumMatch[1], request, env);
      }

      if (path === "/api/reading" && request.method === "POST") return await reading(request, env);
      if (path === "/api/speak") return await speak(url, env);

      return json({ error: "not_found" }, 404);
    } catch (err) {
      return json({ error: "server_error", detail: String(err) }, 500);
    }
  },
} satisfies ExportedHandler<Env>;

/* ---------- albums -------------------------------------------------------- */

function slug(length: number): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return [...bytes].map((b) => SLUG_ALPHABET[b % SLUG_ALPHABET.length]).join("");
}

async function createAlbum(request: Request, env: Env): Promise<Response> {
  const body = await request.text();
  if (body.length > MAX_ALBUM_BYTES) return json({ error: "album_too_large" }, 413);
  const album = parseAlbum(body);
  if (!album) return json({ error: "invalid_album" }, 400);

  const id = slug(7);
  const editKey = slug(16);
  album.id = id;
  album.updated = Date.now();
  album.created = album.created || album.updated;

  await env.ALBUM.put(`album:${id}`, JSON.stringify({ album, editKey }));
  return json({ id, editKey, album });
}

async function readAlbum(id: string, env: Env): Promise<Response> {
  const raw = await env.ALBUM.get(`album:${id}`);
  if (!raw) return json({ error: "not_found" }, 404);
  const { album } = JSON.parse(raw) as { album: Album };
  return json({ album }, 200, { "cache-control": "public, max-age=30" });
}

async function updateAlbum(id: string, request: Request, env: Env): Promise<Response> {
  const raw = await env.ALBUM.get(`album:${id}`);
  if (!raw) return json({ error: "not_found" }, 404);
  const stored = JSON.parse(raw) as { album: Album; editKey: string };
  if (request.headers.get("x-edit-key") !== stored.editKey) return json({ error: "wrong_key" }, 403);

  const body = await request.text();
  if (body.length > MAX_ALBUM_BYTES) return json({ error: "album_too_large" }, 413);
  const album = parseAlbum(body);
  if (!album) return json({ error: "invalid_album" }, 400);

  album.id = id;
  album.created = stored.album.created;
  album.updated = Date.now();
  await env.ALBUM.put(`album:${id}`, JSON.stringify({ album, editKey: stored.editKey }));
  return json({ id, album });
}

function parseAlbum(body: string): Album | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    return null;
  }
  const album = parsed as Album;
  if (!album || typeof album.title !== "string" || !Array.isArray(album.frames) || album.frames.length === 0) return null;
  for (const frame of album.frames) {
    if (!Array.isArray(frame.columns) || frame.columns.length === 0) return null;
    for (const column of frame.columns) {
      if (!Array.isArray(column.chunks) || column.chunks.length === 0) return null;
    }
  }
  return album;
}

/* ---------- reading texts ------------------------------------------------- */

async function reading(request: Request, env: Env): Promise<Response> {
  const { album, level, nonce } = (await request.json()) as {
    album: Album;
    level: ReadingLevel;
    nonce?: number;
  };
  if (!album || !level) return json({ error: "invalid_request" }, 400);

  const signature = await sha256(
    JSON.stringify({
      v: 3,
      title: album.title,
      vocab: allChunks(album).map((c) => c.hz),
      level,
      nonce: nonce ?? 0,
    }),
  );
  const cacheKey = `read:${signature}`;

  const cached = await env.ALBUM.get(cacheKey);
  if (cached) return json({ text: JSON.parse(cached) as ReadingText, cached: true });

  const generated = (await generateReading(env, album, level)) ?? composeReading(album, level);
  if (!generated.offline) await env.ALBUM.put(cacheKey, JSON.stringify(generated), { expirationTtl: 60 * 60 * 24 * 30 });
  return json({ text: generated, cached: false });
}

type LevelSpec = (typeof READING_LEVELS)[number];

function hanziCount(text: string): number {
  return text.replace(/[^\u4e00-\u9fff]/g, "").length;
}

function readingPrompt(album: Album, spec: LevelSpec, extra = ""): { system: string; user: string } {
  const vocabList = allChunks(album)
    .map((c) => `${c.hz} (${c.py}) = ${c.en}`)
    .join("\n");
  const examples = sampleSentences(album, 6, rng(album.title + String(spec.id)))
    .map((s) => s.hz)
    .join("\n");

  const system = [
    "You write NSW school graded readers in simplified Chinese.",
    "Return one JSON object and nothing else: no markdown, no analysis, no chain of thought, no text before or after the object.",
    "The passage must be natural, idiomatic and grammatically correct.",
    "Stay inside the supplied vocabulary plus the allowed function words and numbers for this level.",
    "Do not invent facts about real people, schools or brands.",
  ].join(" ");

  const user = [
    `Topic: ${album.title} (${album.titleEn}).`,
    `NSW year: ${spec.hz} / ${spec.en}.`,
    `Character count of body (hanzi only, ignore punctuation and Latin): between ${spec.min} and ${spec.max}. Aim for the middle of that range.`,
    `Grammar for this level: ${spec.grammar}`,
    `Allowed function words: ${spec.glue}. Numbers are allowed.`,
    "Vocabulary the class already knows:",
    vocabList,
    "Sentence patterns from the class's sentence builder:",
    examples,
    "Write a first-person passage a student of this year can read without a dictionary.",
    "Use the grammar named for this level. Do not use structures listed as forbidden.",
    "Then write four multiple-choice comprehension questions in Chinese, each with an English translation and exactly three options, testing a detail from the passage.",
    extra,
    'JSON shape: {"title":"中文标题","titleEn":"English title","body":"passage in simplified Chinese with 。，！？ punctuation","translation":"a plain English translation","questions":[{"q":"中文问题","qEn":"English question","options":["选项一","选项二","选项三"],"answer":0}]}',
  ]
    .filter(Boolean)
    .join("\n");

  return { system, user };
}

async function generateReading(env: Env, album: Album, level: ReadingLevel): Promise<ReadingText | null> {
  const key = env.NVIDIA_API_KEY;
  if (!key) {
    console.warn("reading: NVIDIA_API_KEY is not set");
    return null;
  }

  const spec = READING_LEVELS.find((l) => l.id === level) ?? READING_LEVELS[0];
  const maxTokens = level <= 2 ? 1200 : level <= 4 ? 1800 : 2400;
  const prompt = readingPrompt(album, spec);

  const first = await callDeepseek(key, prompt, maxTokens);
  if (!first) return null;
  const accepted = validateReading(first, level, album);
  if (accepted) return accepted;

  const n = typeof first.body === "string" ? hanziCount(first.body) : 0;
  const retry = await callDeepseek(
    key,
    readingPrompt(
      album,
      spec,
      `Rewrite. body must contain ${spec.min}–${spec.max} Chinese characters. The previous body had ${n}. JSON only.`,
    ),
    maxTokens,
  );
  return retry ? validateReading(retry, level, album) : null;
}

interface NvidiaMessage {
  content?: string | Array<{ type?: string; text?: string }>;
  reasoning_content?: string;
}

async function callDeepseek(
  apiKey: string,
  prompt: { system: string; user: string },
  maxTokens: number,
): Promise<Record<string, unknown> | null> {
  const payload: Record<string, unknown> = {
    model: NVIDIA_MODEL,
    messages: [
      { role: "system", content: prompt.system },
      { role: "user", content: prompt.user },
    ],
    temperature: 0.4,
    max_tokens: maxTokens,
    reasoning_effort: "none",
    chat_template_kwargs: { thinking: false },
    stream: false,
  };

  try {
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let response = await fetch(NVIDIA_CHAT_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(45_000),
    });

    if (response.status === 422) {
      delete payload.reasoning_effort;
      payload.chat_template_kwargs = { thinking: false };
      response = await fetch(NVIDIA_CHAT_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(45_000),
      });
    }

    if (response.status === 529) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      response = await fetch(NVIDIA_CHAT_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(45_000),
      });
    }

    if (!response.ok) {
      const detail = (await response.text()).slice(0, 240);
      console.warn(`reading: nvidia ${response.status} ${detail}`);
      return null;
    }

    const data = (await response.json()) as { choices?: { message?: NvidiaMessage }[] };
    const parsed = extractJson(messageText(data.choices?.[0]?.message));
    if (!parsed) console.warn("reading: nvidia returned no JSON");
    return parsed;
  } catch (err) {
    console.warn(`reading: nvidia failed — ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }
}

function messageText(message: NvidiaMessage | undefined): string {
  if (!message) return "";
  const { content } = message;
  let text = "";
  if (typeof content === "string") text = content;
  else if (Array.isArray(content)) {
    text = content.map((part) => (typeof part.text === "string" ? part.text : "")).join("");
  }
  return text.trim() ? text : message.reasoning_content ?? "";
}

function extractJson(raw: string): Record<string, unknown> | null {
  const spoken = raw
    .replace(/<think>[\s\S]*?<\/think>/g, "")
    .replace(/<think>[\s\S]*/g, "")
    .replace(/```(?:json)?/g, "")
    .replace(/```/g, "")
    .trim();
  const start = spoken.indexOf("{");
  const end = spoken.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(spoken.slice(start, end + 1));
  } catch {
    return null;
  }
}

function validateReading(data: Record<string, unknown>, level: ReadingLevel, album: Album): ReadingText | null {
  const spec = READING_LEVELS.find((l) => l.id === level) ?? READING_LEVELS[0];
  const body = typeof data.body === "string" ? data.body.trim() : "";
  const chars = hanziCount(body);
  const floor = Math.floor(spec.min * 0.9);
  const ceiling = Math.ceil(spec.max * 1.12);
  if (chars < floor || chars > ceiling) return null;

  // A passage where most characters are strangers is not a graded reader.
  if (coverage(album, body).pct < 50) return null;

  const questions = Array.isArray(data.questions)
    ? (data.questions as Record<string, unknown>[])
        .filter(
          (q) =>
            typeof q.q === "string" &&
            Array.isArray(q.options) &&
            (q.options as unknown[]).length >= 2 &&
            typeof q.answer === "number",
        )
        .slice(0, 5)
        .map((q) => ({
          q: String(q.q),
          qEn: typeof q.qEn === "string" ? q.qEn : "",
          options: (q.options as unknown[]).map(String).slice(0, 4),
          answer: Math.max(0, Math.min((q.options as unknown[]).length - 1, Number(q.answer))),
        }))
    : [];

  return {
    level,
    title: typeof data.title === "string" && data.title.trim() ? data.title.trim() : album.title,
    titleEn: typeof data.titleEn === "string" ? data.titleEn.trim() : album.titleEn,
    body,
    translation: typeof data.translation === "string" ? data.translation.trim() : "",
    questions,
  };
}

/**
 * The offline composer. It joins real album sentences with level-appropriate
 * connectives, so a text always exists even when the writing model is
 * unreachable — and it can only ever produce Chinese the teacher authored.
 */
function composeReading(album: Album, level: ReadingLevel): ReadingText {
  const spec = READING_LEVELS.find((l) => l.id === level) ?? READING_LEVELS[0];
  const r = rng(`${album.title}:${level}:offline`);
  const pool = sampleSentences(album, Math.min(24, totalSentences(album)), r);
  const sentences: Sentence[] = [];
  let chars = 0;
  for (const sentence of pool) {
    const next = hanziCount(sentence.hz);
    if (sentences.length && chars + next > spec.max) break;
    sentences.push(sentence);
    chars += next;
    if (chars >= spec.min) break;
  }
  if (!sentences.length && pool[0]) sentences.push(pool[0]);

  const openers =
    level >= 5
      ? ["", "不但如此，", "对年轻人来说，", "如果可以的话，", "为了这个，", "最后，"]
      : level >= 4
        ? ["", "虽然这样，但是", "另外，", "所以", "然后，", "最后，"]
        : level >= 3
          ? ["", "因为这样，", "所以", "然后，", "另外，", "最后，"]
          : level >= 2
            ? ["", "还有，", "", "还有，", "", ""]
            : ["", "", "", "", "", ""];
  const paragraphs: string[] = [];

  sentences.forEach((s, i) => {
    const lead = openers[i % openers.length];
    const line = lead + s.hz + (/[。！？]$/.test(s.hz) ? "" : "。");
    if (i % 4 === 0) paragraphs.push(line);
    else paragraphs[paragraphs.length - 1] += line;
  });

  const inText = new Set(sentences.map((s) => s.hz));
  const strays = (seed: Sentence, want: number) =>
    sentenceDistractors(album, seed, want + 3, r)
      .map((d) => d.hz)
      .filter((hz) => !inText.has(hz))
      .slice(0, want);

  const asked = sentences.slice(0, Math.min(4, sentences.length));
  const drafted = asked.map((s, i) => {
    // Alternating polarity stops four questions reading as one question asked
    // four times, and the negative form forces a read of every option.
    const negative = i % 2 === 1;
    const stray = negative ? strays(s, 1) : [];
    if (negative && stray.length === 1) {
      const seen = sentences.filter((o) => o.hz !== s.hz).slice(0, 2).map((o) => o.hz);
      if (seen.length === 2) {
        const options = shuffle([stray[0], ...seen], r);
        return {
          q: "下面哪一句没有在文章里出现？",
          qEn: "Which of these sentences does not appear in the text?",
          options,
          answer: options.indexOf(stray[0]),
        };
      }
    }
    const options = shuffle([s.hz, ...strays(s, 2)], r);
    return {
      q: "下面哪一句在文章里出现了？",
      qEn: "Which of these sentences appears in the text?",
      options,
      answer: options.indexOf(s.hz),
    };
  });

  // A table small enough to yield one option per question yields no question at
  // all: a choice of one is not comprehension. The passage still stands.
  const questions = drafted.filter((q) => q.options.length > 1);

  return {
    level,
    title: album.title,
    titleEn: album.titleEn,
    body: paragraphs.join("\n\n"),
    translation: sentences.map((s) => s.en).join(" "),
    questions,
    offline: true,
  };
}

/* ---------- speech -------------------------------------------------------- */

async function speak(url: URL, env: Env): Promise<Response> {
  const text = (url.searchParams.get("t") ?? "").slice(0, MAX_SPEAK_CHARS).trim();
  if (!text) return json({ error: "no_text" }, 400);

  const key = `tts:${await sha256(text)}`;
  const cached = await env.ALBUM.get(key);
  if (cached) return audio(base64ToBytes(cached));

  try {
    const result = (await env.AI.run("@cf/myshell-ai/melotts" as keyof AiModels, {
      prompt: text,
      lang: "zh",
    } as never)) as { audio?: string };
    if (!result?.audio) return json({ error: "no_audio" }, 502);
    await env.ALBUM.put(key, result.audio, { expirationTtl: 60 * 60 * 24 * 60 });
    return audio(base64ToBytes(result.audio));
  } catch (err) {
    // The client falls back to the browser's own Mandarin voice on any failure.
    return json({ error: "tts_unavailable", detail: String(err) }, 503);
  }
}

function audio(bytes: Uint8Array): Response {
  return new Response(bytes as unknown as BodyInit, {
    headers: {
      "content-type": "audio/mpeg",
      "cache-control": "public, max-age=604800, immutable",
    },
  });
}

function base64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/* ---------- helpers ------------------------------------------------------- */

async function sha256(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function json(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...headers },
  });
}
