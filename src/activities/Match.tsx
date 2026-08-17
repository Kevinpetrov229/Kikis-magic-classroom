import { useEffect, useMemo, useState } from "react";
import type { Album, Sentence } from "../lib/types";
import { rng, sampleSentences, sentenceDistractors, shuffle } from "../lib/builder";
import { chime, speak } from "../lib/audio";
import { useSettings } from "../lib/settings";
import { ActivityShell, Colophon, useProgress } from "../components/ActivityShell";
import { ACTIVITIES } from "../data/seed";

const ROUNDS = 6;
const OPTIONS = 12;
const META = ACTIVITIES.find((a) => a.id === "match")!;

/**
 * Read and translate to English. Distractors are near misses one or two chunks
 * from the target, so guessing from a single recognised word does not work.
 */
export function Match({ album }: { album: Album }) {
  const progress = useProgress(ROUNDS);
  const { pinyin, rate } = useSettings();
  const sentences = useMemo(
    () => sampleSentences(album, ROUNDS, rng(`${album.id}:match:${progress.seed}`)),
    [album, progress.seed],
  );
  const target = sentences[Math.min(progress.index, sentences.length - 1)];

  const options = useMemo(() => {
    const r = rng(`${album.id}:match:${progress.seed}:${progress.index}`);
    const wrong = sentenceDistractors(album, target, OPTIONS - 1, r);
    return shuffle([target, ...wrong], r) as Sentence[];
  }, [album, target, progress.seed, progress.index]);

  const [chosen, setChosen] = useState<Sentence | null>(null);
  const correct = chosen?.en === target.en;

  useEffect(() => setChosen(null), [progress.index, progress.seed]);

  function choose(option: Sentence) {
    if (chosen) return;
    setChosen(option);
    const ok = option.en === target.en;
    chime(ok ? "ink" : "smudge");
    if (ok) void speak(target.hz, rate);
  }

  if (progress.done) {
    return (
      <ActivityShell
        album={album}
        activity={META}
        total={ROUNDS}
        marks={progress.marks}
        score={progress.score}
        onRestart={progress.restart}
      >
        <Colophon
          album={album}
          score={progress.score}
          accuracy={progress.accuracy}
          onRestart={progress.restart}
          nextHref={`/a/${album.id}`}
        />
      </ActivityShell>
    );
  }

  return (
    <ActivityShell
      album={album}
      activity={META}
      total={ROUNDS}
      marks={progress.marks}
      score={progress.score}
      onRestart={progress.restart}
      footer={
        <div className="row row--wrap row--between">
            <button type="button" className="press press--quiet" onClick={() => void speak(target.hz, rate)}>
              Listen
            </button>
          {chosen && (
            <button type="button" className="press press--zhu" onClick={() => progress.record(correct)} autoFocus>
              Next <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      }
    >
      <div className="stack">
        <div style={{ padding: "var(--s3) 0 var(--s4)", borderBottom: "1px solid var(--edge)" }}>
          <div className="reading">{target.hz}</div>
          {pinyin && (
            <div className="py" style={{ marginTop: "var(--s2)", fontSize: "var(--t-small)" }}>
              {target.py}
            </div>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1px",
            background: "var(--edge-soft)",
            border: "1px solid var(--edge)",
          }}
        >
          {options.map((option, i) => {
            const isTarget = option.en === target.en;
            const isChosen = chosen === option;
            const background = !chosen
              ? "var(--bone)"
              : isTarget
                ? "var(--zhu)"
                : isChosen
                  ? "var(--stone-sunk)"
                  : "var(--bone)";
            return (
              <button
                key={i}
                type="button"
                onClick={() => choose(option)}
                disabled={!!chosen}
                style={{
                  background,
                  color: chosen && isTarget ? "var(--bone)" : isChosen ? "var(--grey-ink)" : "var(--ink)",
                  border: 0,
                  padding: "var(--s3)",
                  textAlign: "left",
                  font: "inherit",
                  fontSize: "var(--t-small)",
                  lineHeight: 1.45,
                  minHeight: 72,
                  transition: "background 120ms",
                }}
              >
                {option.en}
              </button>
            );
          })}
        </div>
      </div>
    </ActivityShell>
  );
}
