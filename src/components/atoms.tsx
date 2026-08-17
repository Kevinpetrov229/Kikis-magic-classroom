import type { ReactNode } from "react";
import type { Chunk } from "../lib/types";
import { useSettings } from "../lib/settings";

export type SealState = "rest" | "inked" | "spent" | "smudge" | "right";

interface SealProps {
  chunk: Chunk;
  state?: SealState;
  onClick?: () => void;
  disabled?: boolean;
  /** Table density. `large` is the activity scale, where the stone is the subject. */
  size?: "sm" | "md" | "lg";
  inline?: boolean;
  /** Override the global annotation settings, e.g. hide English in a translation task. */
  showPinyin?: boolean;
  showEnglish?: boolean;
  title?: string;
}

/** A chunk of Chinese as a carved stone face. The only control this app has. */
export function Seal({
  chunk,
  state = "rest",
  onClick,
  disabled,
  size = "md",
  inline,
  showPinyin,
  showEnglish,
  title,
}: SealProps) {
  const settings = useSettings();
  const py = showPinyin ?? settings.pinyin;
  const en = showEnglish ?? settings.english;

  return (
    <button
      type="button"
      className={`seal${size === "sm" ? " seal--sm" : size === "lg" ? " seal--lg" : ""}${inline ? " seal--inline" : ""}`}
      data-state={state}
      onClick={onClick}
      disabled={disabled || state === "spent"}
      title={title}
    >
      <span className="seal__hz">{chunk.hz}</span>
      {py && chunk.py && <span className="seal__py">{chunk.py}</span>}
      {en && chunk.en && <span className="seal__en">{chunk.en}</span>}
    </button>
  );
}

/** A chunk pressed onto the page: flat vermilion field, characters knocked out. */
export function Impression({ chunk, mega, onClick }: { chunk: Chunk; mega?: boolean; onClick?: () => void }) {
  const settings = useSettings();
  const body = (
    <>
      <span className="impression__hz">{chunk.hz}</span>
      {settings.pinyin && chunk.py && <span className="impression__py">{chunk.py}</span>}
    </>
  );
  if (!onClick) return <span className={`impression${mega ? " impression--mega" : ""}`}>{body}</span>;
  return (
    <button type="button" className={`impression${mega ? " impression--mega" : ""}`} onClick={onClick}>
      {body}
    </button>
  );
}

/** An unfilled slot, drawn as deliberately as a filled one. */
export function Ghost({ wide, children }: { wide?: boolean; children?: ReactNode }) {
  return <span className={`ghost${wide ? " ghost--wide" : ""}`}>{children}</span>;
}

/**
 * One cell per round, as a 正 tally would be kept. Past two dozen rounds the row
 * stops being countable at a glance, so it shows a window of the work in hand
 * rather than a strip of squares wider than the score it belongs to.
 */
const TALLY_WINDOW = 24;

export function Tally({ marks, total }: { marks: ("hit" | "miss")[]; total: number }) {
  const from = total > TALLY_WINDOW ? Math.min(Math.floor(marks.length / TALLY_WINDOW) * TALLY_WINDOW, total - TALLY_WINDOW) : 0;
  const shown = Math.min(total - from, TALLY_WINDOW);

  return (
    <div className="tally" role="img" aria-label={`${marks.length} of ${total} done`}>
      {from > 0 && <span className="tally__from num">{from}</span>}
      {Array.from({ length: shown }, (_, i) => (
        <span
          key={from + i}
          className="tally__cell"
          data-on={marks[from + i] === "hit" ? "true" : marks[from + i] === "miss" ? "miss" : "false"}
        />
      ))}
    </div>
  );
}

export function Nameplate({ href = "/" }: { href?: string }) {
  return (
    <a className="nameplate" href={href}>
      <span className="nameplate__seal" aria-hidden="true">
        <span>句</span>
        <span>谱</span>
      </span>
      <span className="nameplate__words">
        <span className="nameplate__zh">句谱</span>
        <span className="label">Kiki's magic sentence builder</span>
      </span>
    </a>
  );
}

export function Readout({ cells }: { cells: { label: string; value: ReactNode }[] }) {
  return (
    <div className="readout">
      {cells.map((cell) => (
        <div className="readout__cell" key={cell.label}>
          <div className="label">{cell.label}</div>
          <div className="readout__v">{cell.value}</div>
        </div>
      ))}
    </div>
  );
}

export function Grinding({ children = "grinding ink" }: { children?: ReactNode }) {
  return <span className="grinding">{children}</span>;
}
