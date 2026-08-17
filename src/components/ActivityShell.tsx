import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { ActivityMeta, Album } from "../lib/types";
import { Nameplate, Tally } from "./atoms";
import { ControlStrip } from "./ControlStrip";

/** Round bookkeeping shared by every activity. */
export function useProgress(total: number) {
  const [marks, setMarks] = useState<("hit" | "miss")[]>([]);
  const [score, setScore] = useState(0);
  const [seed, setSeed] = useState(0);

  const record = useCallback((ok: boolean, points = 100) => {
    setMarks((m) => [...m, ok ? "hit" : "miss"]);
    if (ok) setScore((s) => s + points);
  }, []);

  const restart = useCallback(() => {
    setMarks([]);
    setScore(0);
    setSeed((s) => s + 1);
  }, []);

  return {
    marks,
    score,
    seed,
    index: marks.length,
    done: marks.length >= total,
    accuracy: marks.length ? Math.round((marks.filter((m) => m === "hit").length / marks.length) * 100) : 0,
    record,
    restart,
  };
}

interface Props {
  album: Album;
  activity: ActivityMeta;
  total: number;
  marks: ("hit" | "miss")[];
  score: number;
  children: ReactNode;
  /** Sits under the working area: replay buttons, answer reveals, next controls. */
  footer?: ReactNode;
  onRestart?: () => void;
}

export function ActivityShell({ album, activity, total, marks, score, children, footer, onRestart }: Props) {
  const today = useMemo(
    () => new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric" }).format(new Date()),
    [],
  );

  return (
    <div className="shell">
      <header className="row row--between row--wrap" style={{ marginBottom: "var(--s5)" }}>
        <Nameplate />
        <div className="row row--wrap" style={{ gap: "var(--s5)" }}>
          <div>
            <div className="label">Score</div>
            <div className="score__value num">{score.toString().padStart(4, "0")}</div>
          </div>
          <div style={{ alignSelf: "center" }}>
            <div className="label" style={{ marginBottom: 5 }}>
              {marks.length} / {total}
            </div>
            <Tally marks={marks} total={total} />
          </div>
        </div>
      </header>

      <nav className="row row--wrap" style={{ marginBottom: "var(--s4)" }} aria-label="Where you are">
        <a href={`/a/${album.id}`} className="label label--zhu" style={{ textDecoration: "none" }}>
          ← {album.titleEn}
        </a>
        <span className="label">/ {activity.strand}</span>
        <span className="hz" style={{ fontSize: "1.0625rem" }}>
          {activity.hz}
        </span>
        <span className="label">{activity.en}</span>
      </nav>

      <div className="plate plate--stage" style={{ flexDirection: "row", alignItems: "stretch" }}>
        <div className="bianku" aria-hidden="true">
          {album.title} · {activity.hz} · {today}
        </div>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <div className="plate__head">
            <span className="label">{activity.brief}</span>
            {onRestart && (
              <button type="button" className="press press--quiet" onClick={onRestart}>
                <span className="press__hz">重来</span>
              </button>
            )}
          </div>
          <div className="plate__body">{children}</div>
          {footer && (
            <>
              <hr className="rule" />
              <div style={{ padding: "var(--s3) var(--s4)" }}>{footer}</div>
            </>
          )}
        </div>
      </div>

      <div style={{ marginTop: "var(--s4)" }}>
        <ControlStrip />
      </div>
    </div>
  );
}

/** The 落款 that closes a finished album page. */
export function Colophon({
  album,
  score,
  accuracy,
  onRestart,
  nextHref,
}: {
  album: Album;
  score: number;
  accuracy: number;
  onRestart: () => void;
  nextHref: string;
}) {
  return (
    <div className="stack" style={{ alignItems: "flex-start" }}>
      <div className="row row--wrap" style={{ gap: "var(--s6)", alignItems: "flex-end" }}>
        <div>
          <div className="label">Final</div>
          <div className="score__value num" style={{ fontSize: "3rem" }}>
            {score}
          </div>
        </div>
        <div>
          <div className="label">Accuracy</div>
          <div className="score__value num" style={{ fontSize: "3rem", color: "var(--qing)" }}>
            {accuracy}%
          </div>
        </div>
        <span className="impression" aria-hidden="true">
          <span className="impression__hz">完</span>
        </span>
      </div>
      <p className="translation" style={{ margin: 0 }}>
        This page of {album.title} is finished. Press 重来 for a fresh set — the sentences are drawn from the album
        again, so no two rounds ask the same thing.
      </p>
      <div className="row row--wrap">
        <button type="button" className="press press--zhu" onClick={onRestart}>
          <span className="press__hz">重来</span> new set
        </button>
        <a className="press" href={nextHref}>
          all activities
        </a>
      </div>
    </div>
  );
}
