import type { Album, Chunk, Column, Frame } from "../lib/types";
import { Seal } from "./atoms";

function isPunctColumn(column: Column): boolean {
  return column.chunks.every((chunk) => /^[。．.！？!?]$/.test(chunk.hz.trim()));
}

function visibleColumns(frame: Frame): { column: Column; index: number }[] {
  return frame.columns
    .map((column, index) => ({ column, index }))
    .filter(({ column }) => !isPunctColumn(column));
}

/**
 * Columns are weighted by their longest chunk. An opinion clause of eight
 * characters and a one-character subject cannot share an equal share of the
 * width without breaking a line mid-phrase.
 */
function columnWidths(frame: Frame): string {
  return visibleColumns(frame)
    .map(({ column }) => {
      const longest = column.chunks.reduce((n, chunk) => Math.max(n, chunk.hz.length), 1);
      const weight = Math.min(2.4, Math.max(0.75, longest / 4.5));
      return `minmax(0, ${weight.toFixed(2)}fr)`;
    })
    .join(" ");
}

export interface Selection {
  frameId: string;
  chunkIds: (string | null)[];
}

interface Props {
  album: Album;
  selection?: Selection;
  onPick?: (frameId: string, columnIndex: number, chunk: Chunk) => void;
  /** Read-only display, used on the album cover and inside the editor preview. */
  quiet?: boolean;
}

/**
 * The album table. Columns are 界格 cells divided by hairlines; every chunk is a
 * stone face. Picking one chunk per column of a single frame is a whole sentence.
 */
export function AlbumTable({ album, selection, onPick, quiet }: Props) {
  return (
    <div className="stack stack--tight">
      {album.frames.map((frame) => {
        const live = selection?.frameId === frame.id;
        return (
          <div className="frame" key={frame.id}>
            <div className="frame__head">
              <span style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                {frame.labelEn || frame.label}
              </span>
              {frame.labelEn && frame.label ? (
                <span className="hz" style={{ fontSize: "1.0625rem", color: "var(--zhu)" }}>
                  {frame.label}
                </span>
              ) : null}
              <span className="label" style={{ marginLeft: "auto" }}>
                {visibleColumns(frame).reduce((n, { column }) => n * column.chunks.length, 1).toLocaleString()} sentences
              </span>
            </div>
            <div className="frame__grid" style={{ gridTemplateColumns: columnWidths(frame) }}>
              {visibleColumns(frame).map(({ column, index: columnIndex }) => (
                <div className="column" key={column.id}>
                  <div className="column__head">
                    <span className="column__en">{column.labelEn || column.label || `Column ${columnIndex + 1}`}</span>
                    {column.labelEn && column.label ? <span className="column__hz">{column.label}</span> : null}
                  </div>
                  <div className="column__stack">
                    {column.chunks.map((chunk) => {
                      const chosen = live && selection?.chunkIds[columnIndex] === chunk.id;
                      return (
                        <Seal
                          key={chunk.id}
                          chunk={chunk}
                          state={chosen ? "inked" : "rest"}
                          disabled={quiet}
                          onClick={quiet ? undefined : () => onPick?.(frame.id, columnIndex, chunk)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
