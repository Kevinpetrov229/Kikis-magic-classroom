import type { Album, Chunk, Column, Frame, Path, Sentence } from "./types";

/* ---------- deterministic randomness -------------------------------------- */

export type Rng = () => number;

export function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32: small, fast, good enough to make a share link reproduce a set. */
export function rng(seed: number | string): Rng {
  let a = typeof seed === "string" ? hashSeed(seed) : seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pick<T>(items: readonly T[], r: Rng): T {
  return items[Math.floor(r() * items.length)];
}

export function shuffle<T>(items: readonly T[], r: Rng): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/* ---------- reading the album -------------------------------------------- */

export function frameOf(album: Album, frameId: string): Frame {
  return album.frames.find((f) => f.id === frameId) ?? album.frames[0];
}

export function chunkOf(column: Column, chunkId: string): Chunk {
  return column.chunks.find((c) => c.id === chunkId) ?? column.chunks[0];
}

export function pathChunks(album: Album, path: Path): Chunk[] {
  const frame = frameOf(album, path.frameId);
  return frame.columns.map((col, i) => chunkOf(col, path.chunkIds[i]));
}

/** Hanzi runs together the way Chinese is actually written — no inserted spaces. */
export function joinHz(chunks: Chunk[]): string {
  return chunks.map((c) => c.hz).join("");
}

export function joinPy(chunks: Chunk[]): string {
  return chunks
    .map((c) => c.py)
    .join(" ")
    .replace(/\s+([,.，。？！])/g, "$1");
}

export function joinEn(chunks: Chunk[]): string {
  const raw = chunks.map((c) => c.en.trim()).join(" ");
  const trimmed = raw.replace(/\s+/g, " ").replace(/\s+([,.?!])/g, "$1");
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function toSentence(album: Album, path: Path): Sentence {
  const chunks = pathChunks(album, path);
  return { path, chunks, hz: joinHz(chunks), py: joinPy(chunks), en: joinEn(chunks) };
}

export function randomPath(album: Album, r: Rng, frameId?: string): Path {
  const frame = frameId ? frameOf(album, frameId) : pick(album.frames, r);
  return { frameId: frame.id, chunkIds: frame.columns.map((col) => pick(col.chunks, r).id) };
}

/**
 * Distinct sentences, capped at what the album can actually produce. Frames are
 * dealt in turn rather than drawn at random, so a page of practice exercises
 * every pattern the album teaches instead of whichever one the dice favoured.
 */
export function sampleSentences(album: Album, count: number, r: Rng): Sentence[] {
  const seen = new Set<string>();
  const out: Sentence[] = [];
  const ceiling = totalSentences(album);
  const wanted = Math.min(count, ceiling);
  let turn = 0;

  while (out.length < wanted && turn < wanted * 60) {
    const frame = album.frames[turn % album.frames.length];
    turn += 1;
    const p = randomPath(album, r, frame.id);
    const key = p.frameId + "|" + p.chunkIds.join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(toSentence(album, p));
  }
  return out;
}

/**
 * How many sentences the table can produce. A column with nothing written in it
 * cannot be picked from, so the frame holding it is worth nothing until it is
 * filled — which is what a teacher part-way through authoring needs to be told,
 * rather than a count that treats blank rows as vocabulary.
 */
export function totalSentences(album: Album): number {
  return album.frames.reduce((sum, frame) => {
    if (!frame.columns.length) return sum;
    return sum + frame.columns.reduce((product, column) => product * written(column.chunks).length, 1);
  }, 0);
}

function written(chunks: Chunk[]): Chunk[] {
  return chunks.filter((c) => c.hz.trim().length > 0);
}

/* ---------- distractors --------------------------------------------------- */

/**
 * Wrong chunks that could plausibly stand in the same slot. Same column of the
 * same frame first, then the same column index in other frames — the teacher's
 * own material is always a better distractor than anything invented.
 */
export function chunkDistractors(album: Album, path: Path, colIndex: number, count: number, r: Rng): Chunk[] {
  const frame = frameOf(album, path.frameId);
  const correctId = path.chunkIds[colIndex];
  const sameColumn = frame.columns[colIndex].chunks.filter((c) => c.id !== correctId);
  const otherFrames = album.frames
    .filter((f) => f.id !== frame.id)
    .flatMap((f) => f.columns[colIndex]?.chunks ?? [])
    .filter((c) => c.hz !== frame.columns[colIndex].chunks.find((x) => x.id === correctId)?.hz);
  const pool = dedupeByHz([...shuffle(sameColumn, r), ...shuffle(otherFrames, r)]);
  return pool.slice(0, count);
}

/** Wrong sentences one or two chunks away from the target: near misses, not noise. */
export function sentenceDistractors(album: Album, target: Sentence, count: number, r: Rng): Sentence[] {
  const frame = frameOf(album, target.path.frameId);
  const out: Sentence[] = [];
  const seen = new Set([target.hz]);
  let guard = 0;
  while (out.length < count && guard++ < count * 80) {
    const chunkIds = target.path.chunkIds.slice();
    const swaps = r() < 0.65 ? 1 : 2;
    for (let s = 0; s < swaps; s++) {
      const ci = Math.floor(r() * frame.columns.length);
      const options = frame.columns[ci].chunks;
      if (options.length < 2) continue;
      chunkIds[ci] = pick(options, r).id;
    }
    const frameId = r() < 0.3 && album.frames.length > 1 ? pick(album.frames, r).id : frame.id;
    const usable =
      frameId === frame.id
        ? { frameId, chunkIds }
        : randomPath(album, r, frameId);
    const sentence = toSentence(album, usable);
    if (seen.has(sentence.hz)) continue;
    seen.add(sentence.hz);
    out.push(sentence);
  }
  return out;
}

function dedupeByHz(chunks: Chunk[]): Chunk[] {
  const seen = new Set<string>();
  return chunks.filter((c) => (seen.has(c.hz) ? false : (seen.add(c.hz), true)));
}

/* ---------- vocabulary --------------------------------------------------- */

export function allChunks(album: Album): Chunk[] {
  return dedupeByHz(album.frames.flatMap((f) => f.columns.flatMap((c) => c.chunks)));
}

const NON_HANZI = /[^\u4e00-\u9fff]/g;

/** Every distinct character in the album, in first-appearance order. */
export function albumCharacters(album: Album): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const chunk of allChunks(album)) {
    for (const ch of chunk.hz.replace(NON_HANZI, "")) {
      if (!seen.has(ch)) {
        seen.add(ch);
        out.push(ch);
      }
    }
  }
  return out;
}

/** Share of a text's characters that the album itself teaches. */
export function coverage(album: Album, text: string): { known: number; total: number; pct: number; strays: string[] } {
  const known = new Set(albumCharacters(album));
  const chars = text.replace(NON_HANZI, "").split("");
  const strays = new Set<string>();
  let hits = 0;
  for (const ch of chars) {
    if (known.has(ch)) hits++;
    else strays.add(ch);
  }
  return {
    known: hits,
    total: chars.length,
    pct: chars.length ? Math.round((hits / chars.length) * 100) : 0,
    strays: [...strays],
  };
}

/* ---------- comparison helpers ------------------------------------------- */

/** Punctuation and spacing are stripped before comparing typed input. */
export function normalise(s: string): string {
  return s
    .replace(/\s+/g, "")
    .replace(/[,.!?;:]/g, (m) => ({ ",": "，", ".": "。", "!": "！", "?": "？", ";": "；", ":": "：" })[m] ?? m);
}

export function sameSentence(a: string, b: string): boolean {
  return normalise(a) === normalise(b);
}

export function newId(prefix = "c"): string {
  return prefix + Math.random().toString(36).slice(2, 8);
}

/**
 * A teacher's own copy of a table: same Chinese, new identities, so editing it
 * cannot overwrite the original — whether that original is a ready-made album
 * or someone else's published class link.
 */
export function cloneAlbum(album: Album): Album {
  const now = Date.now();
  return {
    id: newId("draft"),
    title: album.title,
    titleEn: album.titleEn,
    note: album.note,
    created: now,
    updated: now,
    frames: album.frames.map((frame) => ({
      id: newId("fr"),
      label: frame.label,
      labelEn: frame.labelEn,
      columns: frame.columns.map((column) => ({
        id: newId("col"),
        label: column.label,
        labelEn: column.labelEn,
        chunks: column.chunks.map((chunk) => ({
          id: newId(),
          hz: chunk.hz,
          py: chunk.py,
          en: chunk.en,
        })),
      })),
    })),
  };
}
