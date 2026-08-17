import { useMemo, useState } from "react";
import type { Chunk } from "../lib/types";
import { GIFTS, ACTIVITIES, SEED_ALBUMS } from "../data/seed";
import { joinEn, joinPy, totalSentences } from "../lib/builder";
import { speak } from "../lib/audio";
import { useSettings } from "../lib/settings";
import { AlbumTable, type Selection } from "../components/AlbumTable";
import { ControlStrip } from "../components/ControlStrip";
import { Ghost, Impression, Nameplate } from "../components/atoms";

const OPENING: Selection = {
  frameId: "want",
  chunkIds: ["我想送", "妈妈", "一盒巧克力", "，因为我觉得", "送这个礼物很不错。"],
};

/**
 * The first viewport is the mechanism, not a claim about it: the album arrives
 * with a sentence already stamped, and every stone on the page changes it.
 */
export function Home() {
  const [selection, setSelection] = useState<Selection>(OPENING);
  const { rate } = useSettings();

  const chosen = useMemo(() => {
    const frame = GIFTS.frames.find((f) => f.id === selection.frameId) ?? GIFTS.frames[0];
    return frame.columns.map((column, i) => column.chunks.find((c) => c.id === selection.chunkIds[i]) ?? null);
  }, [selection]);

  const complete = chosen.every(Boolean) ? (chosen as Chunk[]) : null;

  function pick(frameId: string, columnIndex: number, chunk: Chunk) {
    setSelection((current) => {
      const frame = GIFTS.frames.find((f) => f.id === frameId)!;
      const ids =
        current.frameId === frameId ? current.chunkIds.slice() : frame.columns.map(() => null as unknown as string);
      ids[columnIndex] = chunk.id;
      return { frameId, chunkIds: ids };
    });
  }

  return (
    <div className="shell">
      <header className="row row--between row--wrap" style={{ marginBottom: "var(--s6)" }}>
        <Nameplate />
        <nav className="row row--wrap">
          <a className="press press--quiet" href="/library">
            <span className="press__hz">书架</span> albums
          </a>
          <a className="press press--zhu" href="/new">
            <span className="press__hz">刻一张</span> author an album
          </a>
        </nav>
      </header>

      <section className="spread" style={{ marginBottom: "var(--s7)" }}>
        <div className="stack">
          <div>
            <h1
              className="hz"
              style={{ fontSize: "clamp(2.1rem, 5.2vw, 3.9rem)", lineHeight: 1.18, margin: 0, letterSpacing: "0.02em" }}
            >
              一张表，
              <br />
              全班的练习。
            </h1>
            <p className="translation" style={{ marginTop: "var(--s3)", fontSize: "1.0625rem" }}>
              One Mandarin sentence-builder table becomes dictation, translation both ways, typing, gap-fill, sentence
              ordering, stroke-order writing and reading texts at five levels — all drawn from the vocabulary you
              authored. Copy a ready-made table, put your class's words in, and send students one link. No accounts,
              nothing to install.
            </p>
          </div>

          <div>
            <div className="row row--between row--wrap" style={{ marginBottom: "var(--s2)" }}>
              <span className="label">
                {GIFTS.title} · {GIFTS.titleEn}
              </span>
              <a className="label" href={`/new?from=${GIFTS.id}`}>
                copy and add your words →
              </a>
            </div>
            <AlbumTable album={GIFTS} selection={selection} onPick={pick} />
          </div>

          <div className="line-dock">
            <div className="line" aria-live="polite">
              {chosen.map((chunk, i) =>
                chunk ? <Impression key={i} chunk={chunk} mega={i === 0} /> : <Ghost key={i} wide />,
              )}
            </div>
            {complete && (
              <div
                className="row row--between row--wrap"
                style={{ padding: "var(--s3) var(--s4)", border: "1px solid var(--edge)", borderTop: 0 }}
              >
                <div style={{ minWidth: 0 }}>
                  <div className="py" style={{ fontSize: "var(--t-small)" }}>{joinPy(complete)}</div>
                  <div className="gloss">{joinEn(complete)}</div>
                </div>
                <button
                  type="button"
                  className="press press--zhu"
                  onClick={() => void speak(complete.map((c) => c.hz).join(""), rate)}
                >
                  <span className="press__hz">听</span> hear it
                </button>
              </div>
            )}
          </div>
        </div>

        <aside className="stack">
          <div className="plate">
            <div className="plate__head">
              <span className="label">Practise this album</span>
              <span className="label num">09</span>
            </div>
            <div style={{ padding: "0 var(--s4) var(--s3)" }}>
              <div className="index">
                {ACTIVITIES.map((activity, i) => (
                  <a className="index__item" key={activity.id} href={`/a/${GIFTS.id}/${activity.id}`}>
                    <span className="index__n">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="index__hz">{activity.hz}</span>{" "}
                      <span className="index__en">{activity.en}</span>
                      <span className="gloss" style={{ display: "block" }}>
                        {activity.brief}
                      </span>
                    </span>
                  </a>
                ))}
                <a className="index__item" href={`/a/${GIFTS.id}/read`}>
                  <span className="index__n">09</span>
                  <span>
                    <span className="index__hz">读物</span> <span className="index__en">Reading texts</span>
                    <span className="gloss" style={{ display: "block" }}>
                      Five graded texts written from this album's own words, with comprehension questions.
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="plate">
            <div className="plate__head">
              <span className="label">Ready-made albums</span>
            </div>
            <div className="index" style={{ padding: "0 var(--s4) var(--s3)" }}>
              {SEED_ALBUMS.map((album, i) => (
                <a className="index__item" key={album.id} href={`/a/${album.id}`}>
                  <span className="index__n">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="index__hz">{album.title}</span>{" "}
                    <span className="index__en">{album.titleEn}</span>
                    <span className="gloss" style={{ display: "block" }}>
                      {album.frames.length} frames · {totalSentences(album).toLocaleString()} sentences
                    </span>
                  </span>
                </a>
              ))}
              <a className="index__item" href="/new">
                <span className="index__n">+</span>
                <span>
                  <span className="index__hz">刻一张</span> <span className="index__en">Your own table</span>
                  <span className="gloss" style={{ display: "block" }}>
                    Copy a ready-made album or start empty, then paste your class's vocabulary.
                  </span>
                </span>
              </a>
            </div>
          </div>

          <ControlStrip />
        </aside>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1px",
          background: "var(--edge-soft)",
          border: "1px solid var(--edge)",
        }}
      >
        {[
          {
            hz: "一格一格",
            en: "How a table works",
            body: "A frame is a row of columns. Take exactly one chunk from each column and the sentence is grammatical — every time. Two frames let an affirmative and a negative pattern live in one album without breaking each other.",
          },
          {
            hz: "无需登录",
            en: "No accounts",
            body: "Publishing an album returns two links: one for the class and one only you hold, which is what lets you keep editing. Nothing is collected about anyone who opens either.",
          },
          {
            hz: "字音义",
            en: "Characters, sound, meaning",
            body: "Every chunk carries hanzi, tone-marked pinyin and an English gloss, so the same authoring pays for listening, reading, typing and stroke-order practice at once.",
          },
          {
            hz: "五个级别",
            en: "Differentiated reading",
            body: "Reading texts are constrained to the album's vocabulary and re-cast at five levels, so the strongest and the weakest reader in the room work on the same topic.",
          },
        ].map((card) => (
          <div key={card.hz} style={{ background: "var(--bone)", padding: "var(--s4)" }}>
            <div className="hz" style={{ fontSize: "1.375rem", color: "var(--zhu)" }}>
              {card.hz}
            </div>
            <div className="label" style={{ marginBottom: "var(--s2)" }}>
              {card.en}
            </div>
            <p className="gloss" style={{ margin: 0, fontSize: "var(--t-small)" }}>
              {card.body}
            </p>
          </div>
        ))}
      </section>

      <footer className="row row--between row--wrap" style={{ marginTop: "var(--s6)" }}>
        <span className="label">句谱 · Kiki's Sentence Album · runs on Cloudflare Workers</span>
        <a className="press press--zhu" href="/new">
          <span className="press__hz">刻一张</span> author your own album
        </a>
      </footer>
    </div>
  );
}
