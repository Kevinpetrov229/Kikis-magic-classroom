# 句谱 · Kiki's Sentence Album

A Mandarin sentence builder for classroom use. A teacher authors one table of
chunks; the site turns that single table into nine practice activities and into
graded reading passages at five levels, all restricted to the vocabulary the
teacher wrote. Students open a link — no account, nothing to install.

## What a teacher gets

- **The table.** Frames of columns; one chunk from each column, in order, is always
  a grammatical sentence. Two frames let an affirmative and a negative pattern
  live in one album.
- **Nine activities** from the same table: dictation jumble, find the missing
  chunk, sentence match, trapdoor, typing practice with a Chinese punctuation
  pad, cloze, sentence ordering, stroke-order writing, and reading texts.
- **Reading passages** at 入门 / 初级 / 中级 / 中高级 / 高级, written by Workers AI
  under a vocabulary constraint, with four comprehension questions and a count of
  how much of the text came from the album.
- **Your own vocabulary.** Copy any ready-made table (or start empty), paste
  chunks into columns (`汉字 | english`, pinyin filled in), then publish. The
  original album is never overwritten.
- **Two links on publish:** one for the class, one private edit link that is the
  only way back into the album from another device. Keep the edit link; it
  includes the key.

## Run it locally

```bash
npm install
npm run dev
```

Workers AI is not reachable from the local dev server, so reading passages fall
back to the offline composer: it joins real album sentences with level-appropriate
connectives, which means the text is always Chinese the teacher authored herself.
The page says so when that happens.

## Deploy to Cloudflare

The site is one Worker: static assets plus a small API (`/api/*`) for publishing
albums, generating reading texts, and speech.

```bash
npx wrangler login                          # once, per Cloudflare account
npx wrangler kv namespace create ALBUM      # prints an id
```

Put that id in `wrangler.jsonc` in place of the placeholder:

```jsonc
"kv_namespaces": [{ "binding": "ALBUM", "id": "<the id wrangler printed>" }]
```

Then:

```bash
npm run deploy
```

Wrangler prints the `*.workers.dev` URL. That URL is the link you send students.
Nothing else needs configuring: the AI binding needs no API key, and the KV
namespace holds published albums plus cached AI output.

## How it works

| Path | What it is |
| --- | --- |
| `/` | The pitch, with a live table |
| `/library` | Built-in albums and whatever this browser has authored |
| `/new`, `/new?from=:id` | Author a new table, or copy an existing one |
| `/edit/:id?k=` | Keep editing a published album (the private link) |
| `/a/:id` | An album's cover and activity index |
| `/a/:id/:activity` | One activity — `jumble`, `missing`, `match`, `trapdoor`, `typing`, `cloze`, `order`, `trace`, `read` |

The worker (`worker/index.ts`) handles album storage in KV, reading generation
(Workers AI with a KV cache, keyed by album vocabulary and level), and speech
(MeloTTS, falling back to the browser's own voice). Sentence logic lives in
`src/lib/builder.ts` and is shared by both sides.

Drafts are kept in `localStorage` until published, so a teacher can start
authoring without deciding anything first.
