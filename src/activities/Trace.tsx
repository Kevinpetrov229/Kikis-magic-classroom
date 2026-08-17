import { useEffect, useRef, useState } from "react";
import type { Album } from "../lib/types";
import { albumCharacters } from "../lib/builder";
import { charPinyin } from "../lib/pinyin";
import { speak } from "../lib/audio";
import { useSettings } from "../lib/settings";
import { ActivityShell } from "../components/ActivityShell";
import { ACTIVITIES } from "../data/seed";

const META = ACTIVITIES.find((a) => a.id === "trace")!;

type Mode = "watch" | "trace";

/** The 田字格 is the content of this page, so it takes the width it can get. */
function cellSize(): number {
  const w = typeof window === "undefined" ? 340 : window.innerWidth;
  if (w < 480) return Math.max(232, w - 88);
  return w < 1080 ? 300 : 360;
}

/**
 * Character writing. Stroke data comes from hanzi-writer's CDN on demand; if it
 * cannot be reached the character still shows at writing size with its pinyin,
 * so the activity degrades to a copybook rather than breaking.
 */
export function Trace({ album }: { album: Album }) {
  const characters = albumCharacters(album);
  const [active, setActive] = useState(characters[0] ?? "字");
  const [mode, setMode] = useState<Mode>("watch");
  const [py, setPy] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const [strokes, setStrokes] = useState<{ done: number; total: number }>({ done: 0, total: 0 });
  const [mastered, setMastered] = useState<string[]>([]);
  const [size, setSize] = useState(cellSize);
  const holder = useRef<HTMLDivElement>(null);
  const writer = useRef<{ animateCharacter: () => void; quiz: (o: object) => void; cancelQuiz: () => void } | null>(
    null,
  );
  const { rate } = useSettings();

  useEffect(() => {
    void charPinyin(active).then(setPy);
  }, [active]);

  useEffect(() => {
    const onResize = () => setSize(cellSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setStrokes({ done: 0, total: 0 });

    (async () => {
      const { default: HanziWriter } = await import("hanzi-writer");
      if (cancelled || !holder.current) return;
      holder.current.innerHTML = "";

      const instance = HanziWriter.create(holder.current, active, {
        width: size - 16,
        height: size - 16,
        padding: 8,
        showCharacter: mode === "watch",
        showOutline: true,
        strokeColor: "#c9291b",
        outlineColor: "#c0c8b5",
        radicalColor: "#1c6b60",
        drawingColor: "#191f1c",
        highlightColor: "#d8931f",
        strokeAnimationSpeed: 1.1,
        delayBetweenStrokes: 180,
        charDataLoader: (char: string, onLoad: (data: never) => void, onError: () => void) => {
          fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${char}.json`)
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error("no data"))))
            .then((data) => onLoad(data as never))
            .catch(onError);
        },
        onLoadCharDataSuccess: () => !cancelled && setStatus("ready"),
        onLoadCharDataError: () => !cancelled && setStatus("unavailable"),
      });

      writer.current = instance as unknown as typeof writer.current;

      if (mode === "watch") {
        instance.animateCharacter();
      } else {
        instance.quiz({
          onCorrectStroke: (data: { strokesRemaining: number; strokeNum: number }) =>
            setStrokes({ done: data.strokeNum + 1, total: data.strokeNum + 1 + data.strokesRemaining }),
          onComplete: () => {
            setMastered((m) => (m.includes(active) ? m : [...m, active]));
            void speak(active, rate);
          },
        });
      }
    })().catch(() => !cancelled && setStatus("unavailable"));

    return () => {
      cancelled = true;
      writer.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, mode, size]);

  return (
    <ActivityShell
      album={album}
      activity={META}
      total={characters.length}
      marks={mastered.map(() => "hit" as const)}
      score={mastered.length * 50}
      footer={
        <div className="row row--wrap row--between">
          <div className="row row--wrap">
            <button
              type="button"
              className={`press ${mode === "watch" ? "press--zhu" : "press--quiet"}`}
              onClick={() => setMode("watch")}
              aria-pressed={mode === "watch"}
            >
              <span className="press__hz">看笔顺</span> watch
            </button>
            <button
              type="button"
              className={`press ${mode === "trace" ? "press--zhu" : "press--quiet"}`}
              onClick={() => setMode("trace")}
              aria-pressed={mode === "trace"}
            >
              <span className="press__hz">自己写</span> write it
            </button>
            <button type="button" className="press press--quiet" onClick={() => void speak(active, rate)}>
              <span className="press__hz">听</span>
            </button>
          </div>
          <span className="label">
            {mastered.length} of {characters.length} written from memory
          </span>
        </div>
      }
    >
      <div className="spread">
        <div className="stack">
          <div
            className="row row--wrap"
            style={{ alignItems: "flex-start", justifyContent: "center", gap: "var(--s5)" }}
          >
            <div
              className="plate--sunk"
              style={{
                border: "1px solid var(--edge)",
                position: "relative",
                width: size,
                height: size,
                display: "grid",
                placeItems: "center",
                background:
                  "linear-gradient(var(--edge-soft) 0 1px, transparent 1px) 50% 50% / 100% 50%," +
                  "linear-gradient(90deg, var(--edge-soft) 0 1px, transparent 1px) 50% 50% / 50% 100%," +
                  "var(--bone)",
              }}
            >
              <div ref={holder} aria-hidden="true" />
              {status === "unavailable" && (
                <span className="hz" style={{ position: "absolute", fontSize: size * 0.62, color: "var(--zhu)" }}>
                  {active}
                </span>
              )}
            </div>

            <div className="stack stack--tight" style={{ minWidth: 180 }}>
              <div>
                <div className="label">Character</div>
                <div className="hz" style={{ fontSize: "3.25rem", color: "var(--zhu)", lineHeight: 1.1 }}>
                  {active}
                </div>
                <div className="py" style={{ fontSize: "1rem" }}>
                  {py}
                </div>
              </div>
              {mode === "trace" && strokes.total > 0 && (
                <div>
                  <div className="label">Strokes</div>
                  <div className="readout__v num">
                    {strokes.done} / {strokes.total}
                  </div>
                </div>
              )}
              {status === "unavailable" && (
                <p className="notice notice--teng" style={{ margin: 0 }}>
                  Stroke data could not be fetched. The character is shown at writing size in a 田字格 so it can still
                  be copied by hand.
                </p>
              )}
              {mode === "trace" && status === "ready" && (
                <p className="notice" style={{ margin: 0 }}>
                  Draw each stroke inside the grid with a mouse or a finger. A stroke in the wrong place is refused
                  rather than corrected.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="plate">
          <div className="plate__head">
            <span className="label">Every character in {album.title}</span>
            <span className="label num">{characters.length}</span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(46px, 1fr))",
              gap: 1,
              background: "var(--bone)",
              padding: 1,
            }}
          >
            {characters.map((ch) => (
              <button
                key={ch}
                type="button"
                onClick={() => setActive(ch)}
                className="hz"
                aria-pressed={ch === active}
                style={{
                  aspectRatio: "1",
                  border: 0,
                  // the hairline belongs to the cell, so a part-filled last row
                  // ends in paper rather than in an empty grey cell
                  boxShadow: "0 0 0 1px var(--edge-soft)",
                  fontSize: "1.5rem",
                  background: ch === active ? "var(--zhu)" : mastered.includes(ch) ? "var(--zhu-wash)" : "var(--bone)",
                  color: ch === active ? "var(--bone)" : "var(--ink)",
                  transition: "background 120ms",
                }}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ActivityShell>
  );
}
