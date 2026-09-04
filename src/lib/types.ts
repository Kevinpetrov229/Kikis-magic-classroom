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

/** NSW high-school year, used to sequence ready-made albums. */
export type YearLevel = 7 | 8 | 9 | 10 | 11 | 12;

export interface Album {
  id: string;
  title: string;
  titleEn: string;
  /** One line a student reads before starting. */
  note?: string;
  /** NSW year this table belongs to. Omitted on teacher-made albums. */
  year?: YearLevel;
  /** Textbook lesson or HSC theme, shown under the English title. */
  source?: string;
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
  {
    id: 1,
    hz: "七年级",
    en: "Year 7",
    chars: "60–90",
    min: 60,
    max: 90,
    glue: "的 也 和 很 不 在 有 是 这 那 我 他 她 们",
    grammar: "Present tense only: 是, 有, 叫, 在, 喜欢. One idea per short sentence. Do not use 了, 因为, 所以, 虽然, 但是, 不但, 如果, or 对…来说.",
    desc: "Stage 4: 60–90 characters. Short present-tense sentences straight from the table.",
  },
  {
    id: 2,
    hz: "八年级",
    en: "Year 8",
    chars: "110–150",
    min: 110,
    max: 150,
    glue: "的 也 和 还 很 不 在 有 是 这 那 我 他 她 们 每天 一起 喜欢",
    grammar: "Join album sentences with 和, 也, 还有, 每天, 一起. Keep 喜欢 / 在 + place. Do not use 虽然, 不但…而且, 如果, or 对…来说.",
    desc: "Stage 4: 110–150 characters. Album sentences joined with 和, 也, 还有.",
  },
  {
    id: 3,
    hz: "九年级",
    en: "Year 9",
    chars: "170–220",
    min: 170,
    max: 220,
    glue: "的 了 也 和 还 很 不 在 有 是 这 那 我 他 她 们 每天 一起 因为 所以 然后 想 要 时候 觉得",
    grammar: "Two short paragraphs. Use time words (以前 / 以后 / 的时候) and at least one 因为…所以. One 觉得. Do not use 不但…而且 or 对…来说.",
    desc: "Stage 5: 170–220 characters. Time words, 因为/所以, one opinion per paragraph.",
  },
  {
    id: 4,
    hz: "十年级",
    en: "Year 10",
    chars: "230–300",
    min: 230,
    max: 300,
    glue: "的 了 也 和 还 很 不 在 有 是 这 那 我 他 她 们 每天 一起 因为 所以 然后 想 要 时候 觉得 虽然 但是 比 已经 就",
    grammar: "Two or three paragraphs. Use 了, and at least one of 比 or 虽然…但是. 一…就 is allowed. Do not stack Continuers essay connectives.",
    desc: "Stage 5: 230–300 characters. 了, comparison with 比, 虽然/但是.",
  },
  {
    id: 5,
    hz: "十一至十二",
    en: "Years 11–12",
    chars: "320–420",
    min: 320,
    max: 420,
    glue: "的 了 也 和 还 很 不 在 有 是 这 那 我 他 她 们 每天 一起 因为 所以 然后 想 要 时候 觉得 虽然 但是 可是 比 已经 就 不但 而且 如果 为了 比较",
    grammar: "Three or four paragraphs. Use at least two of: 不但…而且, 对…来说, 如果…就, 为了. Opinion plus reason, Continuers tone.",
    desc: "Continuers: 320–420 characters. Longer paragraphs with 不但…而且, 对…来说, and richer connectives.",
  },
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
