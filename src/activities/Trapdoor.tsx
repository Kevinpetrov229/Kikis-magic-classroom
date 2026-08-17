import { useEffect, useMemo, useState } from "react";
import type { Album, Chunk } from "../lib/types";
import { chunkDistractors, frameOf, rng, sampleSentences, shuffle } from "../lib/builder";
import { chime, speak } from "../lib/audio";
import { useSettings } from "../lib/settings";
import { ActivityShell, Colophon, useProgress } from "../components/ActivityShell";
import { Ghost, Impression, Seal } from "../components/atoms";
import { ACTIVITIES } from "../data/seed";

const ROUNDS = 5;
const META = ACTIVITIES.find((a) => a.id === "trapdoor")!;

/**
 * A hidden path through the album, guessed one chunk at a time. A wrong stone
 * wipes the row and the sentence starts again — the pressure is the point.
 */
export function Trapdoor({ album }: { album: Album }) {
  const progress = useProgress(ROUNDS);
  const { rate } = useSettings();
  const sentences = useMemo(
    () => sampleSentences(album, ROUNDS, rng(`${album.id}:trapdoor:${progress.seed}`)),
    [album, progress.seed],
  );
  const target = sentences[Math.min(progress.index, sentences.length - 1)];
  const columns = frameOf(album, target.path.frameId).columns;

  const [step, setStep] = useState(0);
  const [fell, setFell] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setStep(0);
    setFell(false);
    setRevealed(false);
    setAttempt(0);
  }, [progress.index, progress.seed]);

  const choices = useMemo(() => {
    const r = rng(`${album.id}:trapdoor:${progress.seed}:${progress.index}:${step}:${attempt}`);
    const right = target.chunks[step];
    if (!right) return [];
    const wrong = chunkDistractors(album, target.path, step, Math.min(3, columns[step].chunks.length - 1), r);
    return shuffle([right, ...wrong], r) as Chunk[];
  }, [album, target, step, attempt, progress.seed, progress.index, columns]);

  const complete = step >= target.chunks.length;

  function guess(chunk: Chunk) {
    if (fell || complete || revealed) return;
    if (chunk.hz === target.chunks[step].hz) {
      chime("ink");
      const next = step + 1;
      setStep(next);
      if (next >= target.chunks.length) void speak(target.hz, rate);
    } else {
      chime("smudge");
      setFell(true);
    }
  }

  function again() {
    setStep(0);
    setFell(false);
    setAttempt((a) => a + 1);
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
          <div className="row row--wrap">
            <span className="label">
              slot {Math.min(step + 1, target.chunks.length)} of {target.chunks.length}
              {attempt > 0 && ` · fell through ${attempt}×`}
            </span>
            {!complete && !revealed && (
              <button
                type="button"
                className="press press--quiet"
                onClick={() => {
                  setRevealed(true);
                  void speak(target.hz, rate);
                }}
              >
                show answer
              </button>
            )}
          </div>
          {(complete || revealed) && (
            <button
              type="button"
              className="press press--zhu"
              onClick={() => progress.record(complete && !revealed, Math.max(20, 140 - attempt * 40))}
              autoFocus
            >
              next <span aria-hidden="true">→</span>
            </button>
          )}
          {fell && (
            <button type="button" className="press press--zhu" onClick={again} autoFocus>
              <span className="press__hz">再来</span> start this row again
            </button>
          )}
        </div>
      }
    >
      <div className="stack">
        <div className="line" style={fell ? { borderTopColor: "var(--grey-ink)" } : undefined}>
          {revealed
            ? target.chunks.map((chunk, i) => <Impression key={i} chunk={chunk} />)
            : target.chunks.map((chunk, i) =>
                i < step ? (
                  <Impression key={i} chunk={chunk} />
                ) : (
                  <Ghost key={i} wide={i === step}>
                    {i === step && !fell && <span className="label label--zhu">next</span>}
                  </Ghost>
                ),
              )}
          {!step && !fell && !revealed && <span className="line__empty">the row is blank — guess the first chunk</span>}
        </div>

        {fell && (
          <p className="notice notice--zhu">
            <strong className="hz-ui">掉下去了。</strong> Wrong stone for slot {step + 1}. The row is wiped; the hidden
            sentence has not changed.
          </p>
        )}

        {complete && !revealed && (
          <p className="notice">
            <strong className="hz-ui">全对。</strong> {target.py} — {target.en}
          </p>
        )}

        {revealed && (
          <p className="notice notice--teng">
            The hidden sentence was {target.hz} — {target.en}
          </p>
        )}

        {!fell && !complete && !revealed && (
          <div>
            <div className="label" style={{ marginBottom: "var(--s2)" }}>
              {columns[step]?.label ? `${columns[step].label} · ${columns[step].labelEn ?? ""}` : "candidates"}
            </div>
            <div className="bank">
              {choices.map((chunk) => (
                <Seal key={chunk.id + chunk.hz} chunk={chunk} onClick={() => guess(chunk)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </ActivityShell>
  );
}
