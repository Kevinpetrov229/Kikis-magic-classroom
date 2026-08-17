import { useEffect, useMemo, useState } from "react";
import type { Album, Chunk } from "../lib/types";
import { chunkDistractors, frameOf, rng, sampleSentences, shuffle } from "../lib/builder";
import { chime, speak } from "../lib/audio";
import { useSettings } from "../lib/settings";
import { ActivityShell, Colophon, useProgress } from "../components/ActivityShell";
import { Ghost, Impression, Seal } from "../components/atoms";
import { ACTIVITIES } from "../data/seed";

const ROUNDS = 8;
const META = ACTIVITIES.find((a) => a.id === "missing")!;

/** Translate to Chinese: one chunk has been lifted out of the impression row. */
export function Missing({ album }: { album: Album }) {
  const progress = useProgress(ROUNDS);
  const { rate } = useSettings();
  const sentences = useMemo(
    () => sampleSentences(album, ROUNDS, rng(`${album.id}:missing:${progress.seed}`)),
    [album, progress.seed],
  );
  const target = sentences[Math.min(progress.index, sentences.length - 1)];

  const r = useMemo(
    () => rng(`${album.id}:missing:${progress.seed}:${progress.index}`),
    [album.id, progress.seed, progress.index],
  );

  const { gapIndex, bank } = useMemo(() => {
    // Never blank a column that offers only one option: there would be nothing to decide.
    const columns = frameOf(album, target.path.frameId).columns;
    const candidates = columns.map((col, i) => (col.chunks.length > 1 ? i : -1)).filter((i) => i >= 0);
    const usable = candidates.length ? candidates : columns.map((_, i) => i);
    const gap = usable[Math.floor(r() * usable.length)] ?? 0;
    const wrong = chunkDistractors(album, target.path, gap, 8, r);
    return { gapIndex: gap, bank: shuffle([target.chunks[gap], ...wrong], r) as Chunk[] };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [album, target, r]);

  const [chosen, setChosen] = useState<Chunk | null>(null);
  const correct = chosen?.hz === target.chunks[gapIndex].hz;

  useEffect(() => setChosen(null), [progress.index, progress.seed]);

  function choose(chunk: Chunk) {
    if (chosen) return;
    setChosen(chunk);
    const ok = chunk.hz === target.chunks[gapIndex].hz;
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
          <span className="label">
            {chosen
              ? correct
                ? "correct — the chunk is stamped in"
                : "not that one — the right stone is shown in place"
              : "click the chunk that belongs in the gap"}
          </span>
          {chosen && (
            <button type="button" className="press press--zhu" onClick={() => progress.record(correct)} autoFocus>
              Next <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      }
    >
      <div className="stack">
        <p className="translation" style={{ fontSize: "1.0625rem", color: "var(--ink)", margin: 0 }}>
          {target.en}
        </p>

        <div className="line">
          {target.chunks.map((chunk, i) =>
            i === gapIndex ? (
              chosen ? (
                <Impression key={i} chunk={correct ? chunk : chosen} />
              ) : (
                <Ghost key={i} wide={chunk.hz.length > 3} />
              )
            ) : (
              <Impression key={i} chunk={chunk} />
            ),
          )}
        </div>

        {chosen && !correct && (
          <p className="notice notice--zhu">
            The gap wanted{" "}
            <span className="hz-ui" style={{ color: "var(--zhu)", fontSize: "1.125rem" }}>
              {target.chunks[gapIndex].hz}
            </span>{" "}
            <span className="py">{target.chunks[gapIndex].py}</span> — {target.chunks[gapIndex].en}
          </p>
        )}

        <div className="bank bank--grid">
          {bank.map((chunk) => (
            <Seal
              key={chunk.id + chunk.hz}
              chunk={chunk}
              state={
                !chosen
                  ? "rest"
                  : chunk.hz === target.chunks[gapIndex].hz
                    ? "right"
                    : chunk.hz === chosen.hz
                      ? "smudge"
                      : "rest"
              }
              onClick={() => choose(chunk)}
            />
          ))}
        </div>
      </div>
    </ActivityShell>
  );
}
