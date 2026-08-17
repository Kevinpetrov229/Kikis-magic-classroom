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

/** Home is the builder itself: pick a chunk, hear the sentence, open a game. */
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
      <header className="row row--between row--wrap" style={{ marginBottom: "var(--s5)" }}>
        <Nameplate />
        <nav className="row row--wrap">
          <a className="press press--quiet" href="/library">
            Albums
          </a>
          <a className="press press--zhu" href="/new">
            Make an album
          </a>
        </nav>
      </header>

      <section className="spread">
        <div className="stack">
          <div className="row row--between row--wrap" style={{ marginBottom: "var(--s2)" }}>
            <span className="label">
              Click a box to change the sentence · {GIFTS.titleEn}
            </span>
            <a className="label" href={`/new?from=${GIFTS.id}`}>
              Use this table with my words →
            </a>
          </div>
          <AlbumTable album={GIFTS} selection={selection} onPick={pick} />

          <div className="line-dock">
            <div className="line" aria-live="polite">
              {chosen.map((chunk, i) =>
                chunk ? <Impression key={i} chunk={chunk} mega={i === 0} /> : <Ghost key={i} wide />,
              )}
            </div>
            {complete && (
              <div className="row row--between row--wrap">
                <div style={{ minWidth: 0 }}>
                  <div className="py" style={{ fontSize: "var(--t-small)" }}>{joinPy(complete)}</div>
                  <div className="gloss">{joinEn(complete)}</div>
                </div>
                <button
                  type="button"
                  className="press press--zhu"
                  onClick={() => void speak(complete.map((c) => c.hz).join(""), rate)}
                >
                  Listen
                </button>
              </div>
            )}
          </div>
        </div>

        <aside className="stack">
          <div className="plate">
            <div className="plate__head">
              <span className="label">Practice games</span>
            </div>
            <div style={{ padding: "0 var(--s4) var(--s3)" }}>
              <div className="index">
                {ACTIVITIES.map((activity, i) => (
                  <a className="index__item" key={activity.id} href={`/a/${GIFTS.id}/${activity.id}`}>
                    <span className="index__n">{String(i + 1).padStart(2, "0")}</span>
                    <span>
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
                    <span className="index__en">Reading texts</span>
                    <span className="gloss" style={{ display: "block" }}>
                      Graded passages written from this table’s words.
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="plate">
            <div className="plate__head">
              <span className="label">More albums</span>
            </div>
            <div className="index" style={{ padding: "0 var(--s4) var(--s3)" }}>
              {SEED_ALBUMS.map((album, i) => (
                <a className="index__item" key={album.id} href={`/a/${album.id}`}>
                  <span className="index__n">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="index__en">{album.titleEn}</span>
                    <span className="gloss" style={{ display: "block" }}>
                      {totalSentences(album).toLocaleString()} sentences
                    </span>
                  </span>
                </a>
              ))}
              <a className="index__item" href="/new">
                <span className="index__n">+</span>
                <span>
                  <span className="index__en">Make your own</span>
                  <span className="gloss" style={{ display: "block" }}>
                    Copy a table or start empty, then paste your class’s words.
                  </span>
                </span>
              </a>
            </div>
          </div>

          <ControlStrip />
        </aside>
      </section>
    </div>
  );
}
