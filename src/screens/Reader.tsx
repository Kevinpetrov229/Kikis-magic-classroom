import { useCallback, useEffect, useMemo, useState } from "react";
import type { Album, ReadingLevel, ReadingText } from "../lib/types";
import { READING_LEVELS } from "../lib/types";
import { albumCharacters, allChunks, coverage } from "../lib/builder";
import { speak, stopSpeaking } from "../lib/audio";
import { useSettings } from "../lib/settings";
import { Grinding, Nameplate, Readout } from "../components/atoms";
import { ControlStrip } from "../components/ControlStrip";

type Cast = Record<number, ReadingText>;

/**
 * The reading-text generator. The level axis is the one governing control: moving
 * it re-ranks the vocabulary panel and the readout in step, and casts a new text
 * for any level not yet on the page.
 */
export function Reader({ album }: { album: Album }) {
  const [level, setLevel] = useState<ReadingLevel>(2);
  const [cast, setCast] = useState<Cast>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const { rate } = useSettings();

  const text = cast[level];

  const generate = useCallback(
    async (target: ReadingLevel, fresh = false) => {
      setBusy(true);
      setError(null);
      try {
        const res = await fetch("/api/reading", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ album, level: target, nonce: fresh ? nonce + 1 : nonce }),
        });
        if (!res.ok) throw new Error("generation_failed");
        const { text: produced } = (await res.json()) as { text: ReadingText };
        setCast((c) => ({ ...c, [target]: produced }));
        setAnswers({});
        setShowTranslation(false);
        if (fresh) setNonce((n) => n + 1);
      } catch {
        setError("The text could not be written just now. Try again, or pick another level.");
      } finally {
        setBusy(false);
      }
    },
    [album, nonce],
  );

  useEffect(() => {
    if (!cast[level] && !busy) void generate(level);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  useEffect(() => () => stopSpeaking(), []);

  const stats = useMemo(() => (text ? coverage(album, text.body) : null), [album, text]);

  /** Album vocabulary re-ranked by how hard this particular text leans on it. */
  const ranked = useMemo(() => {
    const chunks = allChunks(album);
    if (!text) return chunks.map((chunk) => ({ chunk, hits: 0 }));
    return chunks
      .map((chunk) => ({ chunk, hits: text.body.split(chunk.hz).length - 1 }))
      .sort((a, b) => b.hits - a.hits);
  }, [album, text]);

  const straySet = useMemo(() => new Set(stats?.strays ?? []), [stats]);
  const knownSet = useMemo(() => new Set(albumCharacters(album)), [album]);

  return (
    <div className="shell">
      <header className="row row--between row--wrap" style={{ marginBottom: "var(--s5)" }}>
        <Nameplate />
        <nav className="row row--wrap">
          <a href={`/a/${album.id}`} className="label label--zhu" style={{ textDecoration: "none" }}>
            ← {album.titleEn}
          </a>
          <span className="hz" style={{ fontSize: "1.0625rem" }}>
            读物
          </span>
          <span className="label">Reading texts</span>
        </nav>
      </header>

      <div className="spread spread--governed">
        <div className="plate">
          <div className="plate__head">
            <span className="label">
              {READING_LEVELS[level - 1].hz} · {READING_LEVELS[level - 1].en}
            </span>
            <div className="row row--wrap">
              {busy && <Grinding>casting the text</Grinding>}
              <button type="button" className="press press--quiet" onClick={() => window.print()}>
                print
              </button>
            </div>
          </div>

          <div className="plate__body">
            {error && <p className="notice notice--zhu">{error}</p>}

            {!text && !error && (
              <div className="stack">
                <div className="ghost ghost--wide" style={{ width: "100%", minHeight: 180 }} />
                <span className="label">the page is blank until a level is cast</span>
              </div>
            )}

            {text && (
              <div className="stack">
                <div>
                  <h1 className="hz" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", margin: 0 }}>
                    {text.title}
                  </h1>
                  <div className="label" style={{ marginTop: 4 }}>
                    {text.titleEn}
                  </div>
                </div>

                {text.offline && (
                  <p className="notice notice--teng">
                    Composed directly from the album's own sentences because the writing model was unreachable. Every
                    line is Chinese you authored.
                  </p>
                )}

                <div className="passage">
                  {text.body.split(/\n{2,}/).map((paragraph, pi) => (
                    <p key={pi}>
                      {[...paragraph].map((ch, ci) => (
                        <span
                          key={ci}
                          className={straySet.has(ch) && !knownSet.has(ch) ? "stray" : undefined}
                          title={straySet.has(ch) && !knownSet.has(ch) ? "not in this album" : undefined}
                        >
                          {ch}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>

                <div className="row row--wrap">
                  <button type="button" className="press press--zhu" onClick={() => void speak(text.body.slice(0, 200), rate)}>
                    <span className="press__hz">朗读</span> read aloud
                  </button>
                  <button
                    type="button"
                    className="press press--quiet"
                    onClick={() => setShowTranslation((s) => !s)}
                    aria-expanded={showTranslation}
                  >
                    {showTranslation ? "hide" : "show"} english
                  </button>
                  <button type="button" className="press press--quiet" onClick={() => void generate(level, true)} disabled={busy}>
                    <span className="press__hz">再写一篇</span> another text
                  </button>
                </div>

                {showTranslation && text.translation && <p className="translation">{text.translation}</p>}

                {text.questions.length > 0 && (
                  <>
                    <hr className="rule" />
                    <div className="stack">
                      <div className="label">Comprehension · 阅读理解</div>
                      {text.questions.map((question, qi) => (
                        <div key={qi} className="stack stack--tight">
                          <div className="hz-ui" style={{ fontSize: "1.0625rem" }}>
                            <span className="label label--zhu num" style={{ marginRight: 8 }}>
                              {String(qi + 1).padStart(2, "0")}
                            </span>
                            {question.q}
                          </div>
                          {question.qEn && <div className="gloss">{question.qEn}</div>}
                          <div className="bank">
                            {question.options.map((option, oi) => {
                              const chosen = answers[qi];
                              const state =
                                chosen === undefined
                                  ? "rest"
                                  : oi === question.answer
                                    ? "right"
                                    : oi === chosen
                                      ? "smudge"
                                      : "rest";
                              return (
                                <button
                                  key={oi}
                                  type="button"
                                  className="seal seal--sm"
                                  data-state={state}
                                  style={{ width: "auto" }}
                                  onClick={() => setAnswers((a) => (a[qi] === undefined ? { ...a, [qi]: oi } : a))}
                                >
                                  <span className="seal__hz" style={{ fontSize: "1.0625rem" }}>
                                    {option}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <aside className="stack">
          <div className="plate">
            <div className="plate__head">
              <span className="label">Level axis</span>
              <span className="label num">{Object.keys(cast).length} / 5 cast</span>
            </div>
            <div className="plate__body">
              <div className="axis">
                <div className="axis__track" role="group" aria-label="Reading level">
                  {READING_LEVELS.map((stop) => (
                    <button
                      key={stop.id}
                      type="button"
                      className="axis__stop"
                      aria-pressed={level === stop.id}
                      data-cast={!!cast[stop.id]}
                      onClick={() => setLevel(stop.id as ReadingLevel)}
                    >
                      <span className="axis__hz">{stop.hz}</span>
                      <span className="label">{stop.en}</span>
                    </button>
                  ))}
                </div>
                <p className="gloss" style={{ margin: 0 }}>
                  {READING_LEVELS[level - 1].desc}
                </p>
              </div>
            </div>
          </div>

          <Readout
            cells={[
              { label: "level", value: `${level} / 5` },
              { label: "characters", value: stats ? stats.total : "—" },
              { label: "from album", value: stats ? `${stats.pct}%` : "—" },
              { label: "new characters", value: stats ? stats.strays.length : "—" },
            ]}
          />

          <div className="plate">
            <div className="plate__head">
              <span className="label">Album vocabulary, ranked by this text</span>
            </div>
            <div style={{ maxHeight: 420, overflow: "auto" }}>
              {ranked.map(({ chunk, hits }) => (
                <div
                  key={chunk.id}
                  className="row"
                  style={{
                    justifyContent: "space-between",
                    padding: "6px var(--s3)",
                    borderBottom: "1px solid var(--edge-soft)",
                    opacity: hits ? 1 : 0.45,
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div className="hz-ui" style={{ fontSize: "1.0625rem", color: hits ? "var(--zhu)" : "var(--ink-faint)" }}>
                      {chunk.hz}
                    </div>
                    <div className="py">{chunk.py}</div>
                    <div className="gloss">{chunk.en}</div>
                  </div>
                  <span className="label num" style={{ color: hits ? "var(--teng)" : "var(--edge)" }}>
                    ×{hits}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <ControlStrip />
        </aside>
      </div>
    </div>
  );
}
