# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + Vite (TypeScript), deployed as a Cloudflare Worker with static assets. Cloudflare KV stores published builders and cached generated texts; Workers AI generates reading texts and Mandarin speech. No login, no accounts — every artefact is reachable by link alone.

## Users

Primary: a Mandarin teacher (secondary / MYP-IB / GCSE-style classroom) who authors a sentence builder for a topic, then sends one link to students. She works at a laptop during planning time, often in a hurry between lessons.

Secondary: her students, on school laptops, Chromebooks and phones, practising the same builder as homework or in class. They arrive from a link with no account and no instructions.

## Product Purpose

Turn one authored sentence-builder table into a full bank of listening, translation, typing, gap-fill and ordering activities plus differentiated reading texts, so a teacher does the language design once and the practice is generated. Success: a teacher builds a topic in under ten minutes and shares a link that keeps a class productively busy without any further setup.

## Positioning

The Language Gym mechanic (a substitution-table sentence builder that generates hundreds of correct sentences) built natively for Mandarin — every chunk carries hanzi, pinyin and English together, so pronunciation, meaning and character form travel through every activity. And the same table drives an AI reading-text generator constrained to the builder's own vocabulary at multiple difficulty levels, which existing sentence-builder tools do not do.

## Operating Context

- The teacher's raw material is a textbook or scheme-of-work vocabulary list for one topic (e.g. "Buying gifts", "Daily routine", "Family").
- A builder is a set of parallel rows; each row is an ordered set of columns; each column holds one or more chunks. A valid sentence picks exactly one chunk per column within a single row. Rows exist so affirmative and negative frames ("我想送" / "我不想送") stay grammatical.
- Chunk shape: hanzi + pinyin + English gloss. Pinyin uses tone marks.
- Chinese punctuation (。，？) is always strict; English glosses often mirror Chinese structure rather than being idiomatic English.
- Classroom devices are mixed and often muted; audio must be optional and never a prerequisite.

## Capabilities and Constraints

Confirmed activities, derived from the reference screenshots:

1. Dictation → chunk jumble: hear the sentence, click chunks to rebuild it.
2. Translate to Chinese → find the missing chunk from a bank.
3. Read & translate to English → sentence match against distractors.
4. Trapdoor: chunk by chunk, one wrong click restarts.
5. Typing / 跟打练习: type the target sentence, with on-screen pinyin-friendly keypad and Chinese punctuation.
6. 选词填空: cloze with a shared word bank across several sentences.
7. 句子排序: drag scrambled chunks into sentence order.
8. Character tracing / stroke order for the hanzi in the builder.
9. Reading-text generator: AI text at multiple levels, restricted to builder vocabulary, with comprehension questions.

Constraints: no login and no personal data; a link must work for an anonymous visitor; builders are editable by anyone holding the edit link; teacher's own library lives in browser storage; audio degrades to browser speech synthesis; every activity must work without audio and by keyboard.

## Brand Commitments

Project name in the repository is "Kiki's magic classroom". Reference behaviour to replicate: Language Gym sentence-builder activities, MandarinTreeHub interactive tools, ArchChinese character/pinyin support.

## Evidence on Hand

Nine reference screenshots of the incumbent tools (Language Gym activity screens, a sentence-builder table for "Buying gifts", MandarinTreeHub typing / cloze / sentence-ordering tools, a builder index list). No real teacher testimonials, usage numbers, school names or pricing exist — none may be invented.

## Product Principles

1. Author once, generate everything. A new activity type must need no extra authoring.
2. Hanzi, pinyin and meaning are one object, never three separate features.
3. A link is the entire onboarding. Any screen a student lands on must be self-explanatory.
4. Correctness is the teacher's; the tool never silently "fixes" her Chinese.
5. Nothing blocks on audio, network AI, or a modern device.

## Accessibility & Inclusion

Keyboard operable throughout (activities are click-driven but must accept keyboard); audio optional; readable hanzi at large sizes for character recognition; works on a phone.
