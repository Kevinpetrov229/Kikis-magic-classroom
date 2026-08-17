/** A single clickable piece of Chinese: characters, pinyin with tone marks, English gloss. */
export interface Chunk {
  id: string;
  hz: string;
  py: string;
  en: string;
}

/** One slot in a frame. Every valid sentence takes exactly one chunk from each column. */
export interface Column {
  id: string;
  /** Chinese column heading shown above the cell, e.g. 时间. Optional. */
  label?: string;
  /** English heading. Optional. */
  labelEn?: string;
  chunks: Chunk[];
}

/**
 * A frame: an ordered set of columns whose every combination is grammatical.
 * Frames exist so an affirmative and a negative pattern can live in one album
 * without producing broken Chinese across them.
 */
export interface Frame {
  id: string;
  label: string;
  labelEn?: string;
  columns: Column[];
}

export interface Album {
  id: string;
  title: string;
  titleEn: string;
  /** One line a student reads before starting. */
  note?: string;
  frames: Frame[];
  created: number;
  updated: number;
}

/** A chosen route through one frame: the identity of a sentence. */
export interface Path {
  frameId: string;
  chunkIds: string[];
}

export interface Sentence {
  path: Path;
  chunks: Chunk[];
  hz: string;
  py: string;
  en: string;
}

export type ActivityId =
  | "jumble"
  | "missing"
  | "match"
  | "trapdoor"
  | "typing"
  | "cloze"
  | "order"
  | "trace";

export interface ActivityMeta {
  id: ActivityId;
  hz: string;
  en: string;
  /** Grouping used by the index, mirroring how the reference tools file activities. */
  strand: "Listening" | "Into Chinese" | "Into English" | "Writing" | "Memory";
  brief: string;
}

export const READING_LEVELS = [
  { id: 1, hz: "入门", en: "Starter", chars: "60–90", desc: "Short sentences straight from the album, present tense only." },
  { id: 2, hz: "初级", en: "Developing", chars: "110–150", desc: "Album sentences joined with 和, 也, 还有." },
  { id: 3, hz: "中级", en: "Secure", chars: "170–220", desc: "Time words, 因为/所以, one opinion per paragraph." },
  { id: 4, hz: "中高级", en: "Extending", chars: "230–300", desc: "Past reference with 了, comparison with 比, 虽然/但是." },
  { id: 5, hz: "高级", en: "Stretch", chars: "320–420", desc: "Longer paragraphs, 不但…而且, 对…来说, richer connectives." },
] as const;

export type ReadingLevel = (typeof READING_LEVELS)[number]["id"];

export interface ReadingQuestion {
  q: string;
  qEn: string;
  options: string[];
  answer: number;
}

export interface ReadingText {
  level: ReadingLevel;
  title: string;
  titleEn: string;
  body: string;
  translation: string;
  questions: ReadingQuestion[];
  /** true when the deterministic composer produced it instead of the model. */
  offline?: boolean;
}
