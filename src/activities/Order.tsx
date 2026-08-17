import { useEffect, useMemo, useState } from "react";
import type { Album, Chunk } from "../lib/types";
import { rng, sampleSentences, shuffle } from "../lib/builder";
import { chime, speak } from "../lib/audio";
import { useSettings } from "../lib/settings";
import { ActivityShell, Colophon, useProgress } from "../components/ActivityShell";
import { Impression } from "../components/atoms";
import { ACTIVITIES } from "../data/seed";

const ROUNDS = 6;
const META = ACTIVITIES.find((a) => a.id === "order")!;

/**
 * 句子排序. The reading counterpart of the dictation jumble: the chunks are on the
 * page from the start, pinyin above the characters, and nothing is spoken until
 * the row is right. Chunks can be dragged or clicked.
 */
export function Order({ album }: { album: Album }) {
  const progress = useProgress(ROUNDS);
  const { english, rate } = useSettings();
  const sentences = useMemo(
    () => sampleSentences(album, ROUNDS, rng(`${album.id}:order:${progress.seed}`)),
    [album, progress.seed],
  );
  const target = sentences[Math.min(progress.index, sentences.length - 1)];

  const tray = useMemo(
    () => shuffle(target.chunks, rng(`${album.id}:order:${progress.seed}:${progress.index}`)),
    [album.id, progress.seed, progress.index, target],
  );

  const [placed, setPlaced] = useState<number[]>([]);
  const [verdict, setVerdict] = useState<"open" | "right" | "wrong">("open");

  useEffect(() => {
    setPlaced([]);
    setVerdict("open");
  }, [progress.index, progress.seed]);

  function place(trayIndex: number) {
    if (verdict !== "open" || placed.includes(trayIndex)) return;
    const next = [...placed, trayIndex];
    setPlaced(next);
    chime("ink");
    if (next.length === tray.length) {
      const built = next.map((i) => tray[i]);
      const ok = built.every((chunk, i) => chunk.id === target.chunks[i].id);
      setVerdict(ok ? "right" : "wrong");
      chime(ok ? "ink" : "smudge");
      if (ok) void speak(target.hz, rate);
    }
  }

  function removeAt(position: number) {
    if (verdict === "right") return;
    setPlaced((p) => p.filter((_, i) => i !== position));
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
            <span className="label">
              {placed.length} of {tray.length} placed
            </span>
            <button
              type="button"
              className="press press--quiet"
              onClick={() => removeAt(placed.length - 1)}
              disabled={!placed.length || verdict === "right"}
            >
              lift last
            </button>
          </div>
          {verdict !== "open" && (
            <button type="button" className="press press--zhu" onClick={() => progress.record(verdict === "right")} autoFocus>
              next <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      }
    >
      <div className="stack">
        {english && (
          <p className="translation" style={{ margin: 0, color: "var(--ink)" }}>
            {target.en}
          </p>
        )}

        <div
          className="line"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const index = Number(e.dataTransfer.getData("text/plain"));
            if (!Number.isNaN(index)) place(index);
          }}
          style={verdict === "wrong" ? { borderTopColor: "var(--grey-ink)" } : undefined}
        >
          {placed.map((trayIndex, position) => (
            <Impression key={`${trayIndex}-${position}`} chunk={tray[trayIndex]} onClick={() => removeAt(position)} />
          ))}
          {!placed.length && <span className="line__empty">把词语放到这里，拼成句子 — drop or click the words to build the sentence</span>}
        </div>

        {verdict === "right" && (
          <p className="notice">
            <strong className="hz-ui">对了。</strong> {target.py}
          </p>
        )}
        {verdict === "wrong" && (
          <p className="notice notice--zhu">
            <strong className="hz-ui">顺序不对。</strong> The album's order is{" "}
            <span className="hz-ui" style={{ color: "var(--zhu)" }}>
              {target.hz}
            </span>
            . Lift a chunk and try again, or move on.
          </p>
        )}

        <div>
          <div className="label" style={{ marginBottom: "var(--s2)" }}>
            The words, scrambled
          </div>
          <div className="bank">
            {tray.map((chunk: Chunk, i) => {
              const used = placed.includes(i);
              return (
                <button
                  key={chunk.id + i}
                  type="button"
                  draggable={!used}
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", String(i))}
                  onClick={() => place(i)}
                  disabled={used}
                  className="seal"
                  data-state={used ? "spent" : "rest"}
                  style={{ width: "auto", cursor: used ? "default" : "grab" }}
                >
                  <span className="seal__py" style={{ marginTop: 0, marginBottom: 2 }}>
                    {chunk.py}
                  </span>
                  <span className="seal__hz">{chunk.hz}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </ActivityShell>
  );
}
