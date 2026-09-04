import type { ActivityMeta, Album, YearLevel } from "../lib/types";
import { YEAR7 } from "./year7";
import { YEAR8 } from "./year8";
import { YEAR9 } from "./year9";
import { YEAR10 } from "./year10";
import { YEAR11 } from "./year11";
import { YEAR12 } from "./year12";

export const YEAR_BANDS: {
  year: YearLevel;
  label: string;
  stage: string;
  course: string;
  book: string;
}[] = [
  { year: 7, label: "Year 7", stage: "Stage 4", course: "7–10 Chinese", book: "中文真棒 I · Lessons 1–6" },
  { year: 8, label: "Year 8", stage: "Stage 4", course: "7–10 Chinese", book: "中文真棒 I · Lessons 7–12" },
  { year: 9, label: "Year 9", stage: "Stage 5", course: "7–10 Chinese", book: "中文真棒 II" },
  { year: 10, label: "Year 10", stage: "Stage 5", course: "7–10 Chinese", book: "中文真棒 III" },
  { year: 11, label: "Year 11", stage: "Stage 6", course: "Chinese Continuers · Preliminary", book: "中文真棒 IV · Lessons 1–6" },
  { year: 12, label: "Year 12", stage: "Stage 6", course: "Chinese Continuers · HSC", book: "中文真棒 IV · Lessons 7–12 + HSC themes" },
];

export const SEED_ALBUMS: Album[] = [...YEAR7, ...YEAR8, ...YEAR9, ...YEAR10, ...YEAR11, ...YEAR12];

export const HOME_ALBUM = YEAR7[0];

export function albumsForYear(year: YearLevel): Album[] {
  return SEED_ALBUMS.filter((album) => album.year === year);
}

export const ACTIVITIES: ActivityMeta[] = [
  {
    id: "jumble",
    hz: "听写拼句",
    en: "Dictation jumble",
    strand: "Listening",
    brief: "Hear the sentence, then stamp the chunks back in the right order.",
  },
  {
    id: "missing",
    hz: "找缺失",
    en: "Find the missing chunk",
    strand: "Into Chinese",
    brief: "One chunk is missing from the Chinese. Read the English and stamp it in.",
  },
  {
    id: "match",
    hz: "配句意",
    en: "Sentence match",
    strand: "Into English",
    brief: "Read the Chinese and choose the English that matches it exactly.",
  },
  {
    id: "trapdoor",
    hz: "陷门",
    en: "Trapdoor",
    strand: "Memory",
    brief: "Guess the hidden sentence chunk by chunk. One wrong stamp and the page is wiped.",
  },
  {
    id: "typing",
    hz: "跟打练习",
    en: "Typing practice",
    strand: "Writing",
    brief: "Type the sentence character by character with a Chinese punctuation pad.",
  },
  {
    id: "cloze",
    hz: "选词填空",
    en: "Cloze",
    strand: "Into Chinese",
    brief: "One word bank, five sentences, one gap in each.",
  },
  {
    id: "order",
    hz: "句子排序",
    en: "Sentence ordering",
    strand: "Into Chinese",
    brief: "Drag the scrambled chunks into a sentence that works.",
  },
  {
    id: "trace",
    hz: "写汉字",
    en: "Character writing",
    strand: "Writing",
    brief: "Trace the stroke order of every character the album teaches.",
  },
];
