import { useEffect, useMemo, useState } from "react";
import type { Album, Chunk } from "../lib/types";
import { rng, sampleSentences, shuffle } from "../lib/builder";
import { chime, speak } from "../lib/audio";
import { useSettings } from "../lib/settings";
import { ActivityShell, Colophon, useProgress } from "../components/ActivityShell";
import { Ghost, Impression, Seal } from "../components/atoms";
import { ACTIVITIES } from "../data/seed";

const ROUNDS = 6;
const META = ACTIVITIES.find((a) => a.id === "jumble")!;

/**
 * Dictation jumble: the sentence is only ever heard. The bank shows characters
 * with no pinyin and no gloss until the student asks for a hint.
 */
export function Jumble({ album }: { album: Album }) {
  const progress = useProgress(ROUNDS);
  const { rate } = useSettings();
  const sentences = useMemo(
    () => sampleSentences(album, ROUNDS, rng(`${album.id}:jumble:${progress.seed}`)),
    [album, progress.seed],
  );
  const target = sentences[Math.min(progress.index, sentences.length - 1)];

  const [built, setBuilt] = useState<Chunk[]>([]);
  const [verdict, setVerdict] = useState<"open" | "right" | "wrong">("open");
  const [hint, setHint] = useState(false);

  const bank = useMemo(
    () => shuffle(target.chunks, rng(`${album.id}:jumble:${progress.seed}:${progress.index}`)),
    [album.id, progress.seed, progress.index, target],
  );

  useEffect(() => {
    setBuilt([]);
    setVerdict("open");
    setHint(false);
    if (!progress.done) void speak(target.hz, rate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.index, progress.seed]);

  const used = new Set(built.map((c) => c.id));

  function place(chunk: Chunk) {
    if (verdict !== "open") return;
    const next = [...built, chunk];
    setBuilt(next);
    chime("ink");
    if (next.length === target.chunks.length) {
      const ok = next.every((c, i) => c.id === target.chunks[i].id);
      setVerdict(ok ? "right" : "wrong");
      chime(ok ? "ink" : "smudge");
      if (!ok) void speak(target.hz, rate);
    }
  }

  function lift() {
    if (verdict === "right") return;
    setBuilt((b) => b.slice(0, -1));
    setVerdict("open");
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
            <button type="button" className="press press--zhu" onClick={() => void speak(target.hz, rate)}>
              Listen
            </button>
            <button type="button" className="press press--quiet" onClick={() => void speak(target.hz, 0.6)}>
              Slowly
            </button>
            <button type="button" className="press press--quiet" onClick={lift} disabled={!built.length}>
              Lift last
            </button>
            <button type="button" className="press press--quiet" onClick={() => setHint(true)} disabled={hint}>
              Hint
            </button>
          </div>
          {verdict !== "open" && (
            <button
              type="button"
              className="press press--zhu"
              onClick={() => progress.record(verdict === "right")}
              autoFocus
            >
              Next <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      }
    >
      <div className="stack">
        {hint && <p className="notice notice--teng">{target.en}</p>}

        <div className="line" aria-live="polite">
          {built.map((chunk, i) => (
            <Impression key={`${chunk.id}-${i}`} chunk={chunk} />
          ))}
          {Array.from({ length: target.chunks.length - built.length }, (_, i) => (
            <Ghost key={`ghost-${i}`} wide={target.chunks[built.length + i]?.hz.length > 3} />
          ))}
        </div>

        {verdict === "right" && (
          <p className="notice">
            <strong>Correct.</strong> {target.py} — {target.en}
          </p>
        )}
        {verdict === "wrong" && (
          <p className="notice notice--zhu">
            <strong>Listen again.</strong> The sentence was{" "}
            <span className="hz-ui" style={{ color: "var(--zhu)" }}>
              {target.hz}
            </span>{" "}
            — {target.en}
          </p>
        )}

        <div>
          <div className="label" style={{ marginBottom: "var(--s2)" }}>
            The chunks, out of order
          </div>
          <div className="bank">
            {bank.map((chunk) => (
              <Seal
                key={chunk.id}
                chunk={chunk}
                size="lg"
                showPinyin={false}
                showEnglish={false}
                state={used.has(chunk.id) ? "spent" : "rest"}
                onClick={() => place(chunk)}
              />
            ))}
          </div>
        </div>
      </div>
    </ActivityShell>
  );
}
