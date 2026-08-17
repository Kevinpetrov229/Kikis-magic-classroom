import { useMemo, useState } from "react";
import type { Album, Chunk } from "../lib/types";
import { frameOf, rng, sampleSentences, shuffle } from "../lib/builder";
import { chime, speak } from "../lib/audio";
import { useSettings } from "../lib/settings";
import { ActivityShell, Colophon, useProgress } from "../components/ActivityShell";
import { Seal } from "../components/atoms";
import { ACTIVITIES } from "../data/seed";

const LINES = 5;
const META = ACTIVITIES.find((a) => a.id === "cloze")!;

interface Line {
  chunks: Chunk[];
  gap: number;
  answer: Chunk;
  hz: string;
  en: string;
}

/** 选词填空: one shared word bank, five sentences, one gap in each. */
export function Cloze({ album }: { album: Album }) {
  const progress = useProgress(LINES);
  const { english, rate } = useSettings();

  const { lines, bank } = useMemo(() => {
    const r = rng(`${album.id}:cloze:${progress.seed}`);
    const built: Line[] = sampleSentences(album, LINES, r).map((sentence) => {
      const columns = frameOf(album, sentence.path.frameId).columns;
      const options = columns.map((col, i) => (col.chunks.length > 1 ? i : -1)).filter((i) => i >= 0);
      const gap = (options.length ? options : columns.map((_, i) => i))[
        Math.floor(r() * (options.length || columns.length))
      ];
      return {
        chunks: sentence.chunks,
        gap,
        answer: sentence.chunks[gap],
        hz: sentence.hz,
        en: sentence.en,
      };
    });
    return { lines: built, bank: shuffle(built.map((l) => l.answer), r) as Chunk[] };
  }, [album, progress.seed]);

  const [filled, setFilled] = useState<(Chunk | null)[]>(() => lines.map(() => null));
  const [active, setActive] = useState(0);
  const [checked, setChecked] = useState(false);

  const usedIds = new Set(filled.filter(Boolean).map((c) => c!.hz + c!.py));
  const allFilled = filled.every(Boolean);

  function place(chunk: Chunk) {
    if (checked) return;
    const slot = filled[active] ? filled.findIndex((f) => !f) : active;
    if (slot < 0) return;
    const next = filled.slice();
    next[slot] = chunk;
    setFilled(next);
    chime("ink");
    const following = next.findIndex((f) => !f);
    setActive(following < 0 ? slot : following);
  }

  function clear(index: number) {
    if (checked) return;
    const next = filled.slice();
    next[index] = null;
    setFilled(next);
    setActive(index);
  }

  function check() {
    setChecked(true);
    lines.forEach((line, i) => {
      progress.record(filled[i]?.hz === line.answer.hz);
    });
    chime(lines.every((line, i) => filled[i]?.hz === line.answer.hz) ? "ink" : "smudge");
  }

  function restart() {
    setFilled(lines.map(() => null));
    setActive(0);
    setChecked(false);
    progress.restart();
  }

  if (progress.done && checked) {
    return (
      <ActivityShell
        album={album}
        activity={META}
        total={LINES}
        marks={progress.marks}
        score={progress.score}
        onRestart={restart}
      >
        <div className="stack">
          <div className="stack stack--tight">
            {lines.map((line, i) => {
              const ok = filled[i]?.hz === line.answer.hz;
              return (
                <div
                  key={i}
                  className="row row--wrap"
                  style={{ borderBottom: "1px solid var(--edge-soft)", paddingBottom: "var(--s2)" }}
                >
                  <span className="label" style={{ color: ok ? "var(--qing)" : "var(--zhu)" }}>
                    {ok ? "correct" : "review"}
                  </span>
                  <span className="hz" style={{ fontSize: "1.375rem" }}>
                    {line.chunks.map((chunk, ci) =>
                      ci === line.gap ? (
                        <span key={ci} style={{ color: ok ? "var(--zhu)" : "var(--grey-ink)" }}>
                          {filled[i]?.hz ?? "＿＿"}
                          {!ok && (
                            <span style={{ color: "var(--zhu)" }}> → {line.answer.hz}</span>
                          )}
                        </span>
                      ) : (
                        <span key={ci}>{chunk.hz}</span>
                      ),
                    )}
                  </span>
                  <button
                    type="button"
                    className="press press--quiet"
                    onClick={() => void speak(line.hz, rate)}
                    aria-label={`hear sentence ${i + 1}`}
                  >
                    Listen
                  </button>
                </div>
              );
            })}
          </div>
          <Colophon
            album={album}
            score={progress.score}
            accuracy={progress.accuracy}
            onRestart={restart}
            nextHref={`/a/${album.id}`}
          />
        </div>
      </ActivityShell>
    );
  }

  return (
    <ActivityShell
      album={album}
      activity={META}
      total={LINES}
      marks={progress.marks}
      score={progress.score}
      onRestart={restart}
      footer={
        <div className="row row--wrap row--between">
          <span className="label">
            {allFilled ? "every gap has a word — check the page" : `gap ${active + 1} is waiting`}
          </span>
          <button type="button" className="press press--zhu" onClick={check} disabled={!allFilled}>
            Check answers
          </button>
        </div>
      }
    >
      <div className="stack">
        <div>
          <div className="label" style={{ marginBottom: "var(--s2)" }}>
            The word bank — every word is used exactly once
          </div>
          <div className="bank">
            {bank.map((chunk, i) => (
              <Seal
                key={chunk.hz + i}
                chunk={chunk}
                showEnglish={english}
                state={usedIds.has(chunk.hz + chunk.py) ? "spent" : "rest"}
                onClick={() => place(chunk)}
              />
            ))}
          </div>
        </div>

        <hr className="rule" />

        <ol className="stack" style={{ listStyle: "none", margin: 0, padding: 0, counterReset: "line" }}>
          {lines.map((line, i) => (
            <li
              key={i}
              className="row row--wrap"
              style={{
                alignItems: "baseline",
                gap: "var(--s3)",
                padding: "var(--s2) var(--s3)",
                background: active === i ? "var(--stone-face)" : "transparent",
                borderLeft: active === i ? "3px solid var(--zhu)" : "3px solid transparent",
              }}
            >
              <span className="label label--zhu num">{String(i + 1).padStart(2, "0")}</span>
              <span className="hz" style={{ fontSize: "1.5rem", lineHeight: 1.6 }}>
                {line.chunks.map((chunk, ci) =>
                  ci === line.gap ? (
                    <button
                      key={ci}
                      type="button"
                      onClick={() => (filled[i] ? clear(i) : setActive(i))}
                      style={{
                        font: "inherit",
                        background: filled[i] ? "var(--zhu)" : "var(--stone-sunk)",
                        color: filled[i] ? "var(--bone)" : "var(--ink-faint)",
                        border: `1px solid ${filled[i] ? "var(--zhu-deep)" : "var(--edge)"}`,
                        borderRadius: 2,
                        padding: "0 8px",
                        margin: "0 3px",
                        minWidth: 96,
                      }}
                    >
                      {filled[i]?.hz ?? "＿＿＿"}
                    </button>
                  ) : (
                    <span key={ci}>{chunk.hz}</span>
                  ),
                )}
              </span>
              {english && <span className="gloss" style={{ flexBasis: "100%" }}>{line.en}</span>}
            </li>
          ))}
        </ol>
      </div>
    </ActivityShell>
  );
}
