import type { Album, Chunk, Column, Frame, YearLevel } from "../lib/types";

/** A clickable piece. The hanzi is the id unless two cells in one album share it. */
export const c = (hz: string, py: string, en: string, id = hz): Chunk => ({ id, hz, py, en });

/** Last slot of a sentence: always ends with a Chinese full stop. */
export function stop(hz: string, py: string, en: string, id?: string): Chunk {
  const ended = /[。！？]$/.test(hz) ? hz : `${hz}。`;
  const gloss = /[.!?]$/.test(en.trim()) ? en : `${en.replace(/[,;:]$/, "")}.`;
  return c(ended, py, gloss, id ?? ended);
}

export function col(id: string, label: string, labelEn: string, chunks: Chunk[]): Column {
  return { id, label, labelEn, chunks };
}

export function frame(id: string, label: string, labelEn: string, columns: Column[]): Frame {
  return { id, label, labelEn, columns };
}

export function album(opts: {
  id: string;
  title: string;
  titleEn: string;
  year: YearLevel;
  source: string;
  note: string;
  frames: Frame[];
}): Album {
  return { created: 0, updated: 0, ...opts };
}
