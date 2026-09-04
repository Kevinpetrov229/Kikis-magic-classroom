import { useMemo, useState } from "react";
import type { Chunk, YearLevel } from "../lib/types";
import { ACTIVITIES, HOME_ALBUM, YEAR_BANDS, albumsForYear } from "../data/seed";
import { joinEn, joinPy, totalSentences } from "../lib/builder";
import { speak } from "../lib/audio";
import { useSettings } from "../lib/settings";
import { AlbumTable, type Selection } from "../components/AlbumTable";
import { ControlStrip } from "../components/ControlStrip";
import { Ghost, Impression, Nameplate } from "../components/atoms";

function openingOf(album: { frames: { id: string; columns: { chunks: { id: string }[] }[] }[] }): Selection {
  const frame = album.frames[0];
  return { frameId: frame.id, chunkIds: frame.columns.map((column) => column.chunks[0].id) };
}

/** Home is the builder itself: pick a year, change a chunk, open a game. */
export function Home() {
  const [year, setYear] = useState<YearLevel>(7);
  const band = YEAR_BANDS.find((item) => item.year === year)!;
  const yearAlbums = albumsForYear(year);
  const album = yearAlbums[0] ?? HOME_ALBUM;
  const [selection, setSelection] = useState<Selection>(() => openingOf(album));
  const { rate } = useSettings();

  const chosen = useMemo(() => {
    const frame = album.frames.find((f) => f.id === selection.frameId) ?? album.frames[0];
    return frame.columns.map((column, i) => column.chunks.find((c) => c.id === selection.chunkIds[i]) ?? null);
  }, [album, selection]);

  const complete = chosen.every(Boolean) ? (chosen as Chunk[]) : null;

  function pickYear(next: YearLevel) {
    setYear(next);
    const first = albumsForYear(next)[0] ?? HOME_ALBUM;
    setSelection(openingOf(first));
  }

  function pick(frameId: string, columnIndex: number, chunk: Chunk) {
    setSelection((current) => {
      const frame = album.frames.find((f) => f.id === frameId)!;
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

      <div className="row row--wrap" style={{ marginBottom: "var(--s4)", gap: "var(--s2)" }}>
        {YEAR_BANDS.map((item) => (
          <button
            key={item.year}
            type="button"
            className={`press ${year === item.year ? "press--zhu" : "press--quiet"}`}
            aria-pressed={year === item.year}
            onClick={() => pickYear(item.year)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className="spread">
        <div className="stack">
          <div className="row row--between row--wrap" style={{ marginBottom: "var(--s2)" }}>
            <span className="label">
              {band.stage} · {band.course} · {album.titleEn}
            </span>
            <a className="label" href={`/new?from=${album.id}`}>
              Use this table with my words →
            </a>
          </div>
          <AlbumTable album={album} selection={selection} onPick={pick} />

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
                  <a className="index__item" key={activity.id} href={`/a/${album.id}/${activity.id}`}>
                    <span className="index__n">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="index__en">{activity.en}</span>
                      <span className="gloss" style={{ display: "block" }}>
                        {activity.brief}
                      </span>
                    </span>
                  </a>
                ))}
                <a className="index__item" href={`/a/${album.id}/read`}>
                  <span className="index__n">09</span>
                  <span>
                    <span className="index__en">Reading texts</span>
                    <span className="gloss" style={{ display: "block" }}>
                      Graded from Year 7 to Years 11–12 Continuers, using this table’s words.
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="plate">
            <div className="plate__head">
              <span className="label">{band.label} albums</span>
            </div>
            <div className="index" style={{ padding: "0 var(--s4) var(--s3)" }}>
              {yearAlbums.map((item, i) => (
                <a className="index__item" key={item.id} href={`/a/${item.id}`}>
                  <span className="index__n">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="index__en">{item.titleEn}</span>
                    <span className="gloss" style={{ display: "block" }}>
                      {item.source} · {totalSentences(item).toLocaleString()} sentences
                    </span>
                  </span>
                </a>
              ))}
              <a className="index__item" href="/library">
                <span className="index__n">→</span>
                <span>
                  <span className="index__en">All years</span>
                  <span className="gloss" style={{ display: "block" }}>
                    Years 7–12, Stage 4 to Continuers.
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
