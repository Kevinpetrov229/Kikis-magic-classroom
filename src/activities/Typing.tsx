import { useEffect, useMemo, useRef, useState } from "react";
import type { Album } from "../lib/types";
import { normalise, rng, sampleSentences } from "../lib/builder";
import { chime, speak } from "../lib/audio";
import { useSettings } from "../lib/settings";
import { ActivityShell, Colophon, useProgress } from "../components/ActivityShell";
import { Readout } from "../components/atoms";
import { ACTIVITIES } from "../data/seed";

const ROUNDS = 5;
const META = ACTIVITIES.find((a) => a.id === "typing")!;
const PUNCTUATION = ["，", "。", "？", "！", "、", "；", "：", "“", "”"];

/**
 * 跟打练习. The target stays on screen and each character lights vermilion as it
 * is matched, so a student sees exactly where the divergence started.
 */
export function Typing({ album }: { album: Album }) {
  const progress = useProgress(ROUNDS);
  const { pinyin, english, rate } = useSettings();
  const sentences = useMemo(
    () => sampleSentences(album, ROUNDS, rng(`${album.id}:typing:${progress.seed}`)),
    [album, progress.seed],
  );
  const target = sentences[Math.min(progress.index, sentences.length - 1)];
  const chars = useMemo(() => [...target.hz], [target.hz]);

  const [typed, setTyped] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const finished = normalise(typed) === normalise(target.hz);
  const wrongCount = [...typed].filter((ch, i) => chars[i] && ch !== chars[i]).length;

  useEffect(() => {
    setTyped("");
    inputRef.current?.focus();
  }, [progress.index, progress.seed]);

  useEffect(() => {
    if (finished) {
      chime("ink");
      void speak(target.hz, rate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  function insert(mark: string) {
    setTyped((t) => t + mark);
    inputRef.current?.focus();
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
            <button type="button" className="press press--quiet" onClick={() => void speak(target.hz, rate)}>
              Listen
            </button>
            <button type="button" className="press press--quiet" onClick={() => setTyped("")} disabled={!typed}>
              Clear
            </button>
          </div>
          {finished ? (
            <button
              type="button"
              className="press press--zhu"
              onClick={() => progress.record(wrongCount === 0, wrongCount === 0 ? 120 : 70)}
              autoFocus
            >
              Next <span aria-hidden="true">→</span>
            </button>
          ) : (
            <button type="button" className="press press--quiet" onClick={() => progress.record(false, 0)}>
              skip this one
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
        {pinyin && <p className="py" style={{ margin: 0, fontSize: "var(--t-small)" }}>{target.py}</p>}

        <div className="reading" style={{ paddingBottom: "var(--s3)", borderBottom: "1px solid var(--edge)" }}>
          {chars.map((ch, i) => {
            const input = [...typed][i];
            const state = input === undefined ? "waiting" : input === ch ? "hit" : "miss";
            return (
              <span
                key={i}
                style={{
                  color:
                    state === "hit" ? "var(--zhu)" : state === "miss" ? "var(--grey-ink)" : "var(--edge)",
                  borderBottom:
                    i === [...typed].length ? "3px solid var(--qing)" : state === "miss" ? "3px solid var(--grey-ink)" : "3px solid transparent",
                  transition: "color 90ms",
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>

        <div className="field">
          <label className="label" htmlFor="typing-input">
            Type it with your own Chinese keyboard — punctuation pad below
          </label>
          <textarea
            id="typing-input"
            ref={inputRef}
            className="textarea"
            style={{ fontFamily: "var(--hz)", fontSize: "1.5rem", minHeight: 78, letterSpacing: "0.04em" }}
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            lang="zh-CN"
          />
        </div>

        <div className="bank">
          {PUNCTUATION.map((mark) => (
            <button key={mark} type="button" className="press press--quiet" onClick={() => insert(mark)}>
              <span className="press__hz">{mark}</span>
            </button>
          ))}
          <button
            type="button"
            className="press press--quiet"
            onClick={() => setTyped((t) => [...t].slice(0, -1).join(""))}
            disabled={!typed}
          >
            ⌫
          </button>
        </div>

        <Readout
          cells={[
            { label: "characters", value: `${[...typed].length} / ${chars.length}` },
            { label: "mismatched", value: wrongCount },
            { label: "state", value: finished ? (wrongCount ? "done, with slips" : "clean") : "in progress" },
          ]}
        />
      </div>
    </ActivityShell>
  );
}
