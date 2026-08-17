import { useMemo, useState } from "react";
import type { Album, Chunk } from "../lib/types";
import { ACTIVITIES } from "../data/seed";
import { joinEn, joinPy, totalSentences } from "../lib/builder";
import { speak } from "../lib/audio";
import { useSettings } from "../lib/settings";
import { shelfEntry } from "../lib/store";
import { AlbumTable, type Selection } from "../components/AlbumTable";
import { ControlStrip } from "../components/ControlStrip";
import { Ghost, Impression, Nameplate } from "../components/atoms";

/** The album's cover page: the table itself, the activity index, and the link to share. */
export function AlbumCover({ album }: { album: Album }) {
  const first = album.frames[0];
  const [selection, setSelection] = useState<Selection>({
    frameId: first.id,
    chunkIds: first.columns.map((column) => column.chunks[0].id),
  });
  const [copied, setCopied] = useState<string | null>(null);
  const { rate } = useSettings();
  const owned = shelfEntry(album.id);

  const chosen = useMemo(() => {
    const frame = album.frames.find((f) => f.id === selection.frameId) ?? album.frames[0];
    return frame.columns.map((column, i) => column.chunks.find((c) => c.id === selection.chunkIds[i]) ?? null);
  }, [album, selection]);
  const complete = chosen.every(Boolean) ? (chosen as Chunk[]) : null;

  function pick(frameId: string, columnIndex: number, chunk: Chunk) {
    setSelection((current) => {
      const frame = album.frames.find((f) => f.id === frameId)!;
      const ids =
        current.frameId === frameId ? current.chunkIds.slice() : frame.columns.map(() => null as unknown as string);
      ids[columnIndex] = chunk.id;
      return { frameId, chunkIds: ids };
    });
  }

  async function copy(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 2200);
    } catch {
      setCopied(null);
    }
  }

  const shareUrl = `${location.origin}/a/${album.id}`;

  return (
    <div className="shell">
      <header className="row row--between row--wrap" style={{ marginBottom: "var(--s5)" }}>
        <Nameplate />
        <nav className="row row--wrap">
          <a className="press press--quiet" href="/library">
            <span className="press__hz">书架</span>
          </a>
          {owned?.editKey && (
            <a className="press press--quiet" href={`/edit/${album.id}?k=${owned.editKey}`}>
              <span className="press__hz">修改</span> edit
            </a>
          )}
          <a className="press press--quiet" href={`/new?from=${album.id}`}>
            <span className="press__hz">刻一张</span> copy and add your words
          </a>
          <button type="button" className="press press--zhu" onClick={() => void copy("class", shareUrl)}>
            <span className="press__hz">分享</span> {copied === "class" ? "link copied" : "copy class link"}
          </button>
        </nav>
      </header>

      <div className="spread">
        <div className="stack">
          <div>
            <h1 className="hz" style={{ fontSize: "clamp(2rem, 4.4vw, 3.2rem)", margin: 0 }}>
              {album.title}
            </h1>
            <div className="row row--wrap" style={{ marginTop: "var(--s2)" }}>
              <span className="label">{album.titleEn}</span>
              <span className="label num">{totalSentences(album).toLocaleString()} sentences</span>
              <span className="label num">{album.frames.length} frames</span>
            </div>
            {album.note && (
              <p className="translation" style={{ marginTop: "var(--s3)" }}>
                {album.note}
              </p>
            )}
          </div>

          <AlbumTable album={album} selection={selection} onPick={pick} />

          <div className="line-dock">
            <div className="line" aria-live="polite">
              {chosen.map((chunk, i) => (chunk ? <Impression key={i} chunk={chunk} /> : <Ghost key={i} wide />))}
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
                  <span className="press__hz">听</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <aside className="stack">
          <div className="plate">
            <div className="plate__head">
              <span className="label">Activities</span>
              <span className="label num">09</span>
            </div>
            <div className="index" style={{ padding: "0 var(--s4) var(--s3)" }}>
              {ACTIVITIES.map((activity, i) => (
                <a className="index__item" key={activity.id} href={`/a/${album.id}/${activity.id}`}>
                  <span className="index__n">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="index__hz">{activity.hz}</span> <span className="index__en">{activity.en}</span>
                    <span className="gloss" style={{ display: "block" }}>
                      {activity.brief}
                    </span>
                  </span>
                </a>
              ))}
              <a className="index__item" href={`/a/${album.id}/read`}>
                <span className="index__n">09</span>
                <span>
                  <span className="index__hz">读物</span> <span className="index__en">Reading texts</span>
                  <span className="gloss" style={{ display: "block" }}>
                    Graded passages at five levels, restricted to this album's words.
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="notice">
            <strong className="hz-ui">Send this to the class.</strong>
            <div className="num" style={{ wordBreak: "break-all", margin: "var(--s2) 0", color: "var(--ink)" }}>
              {shareUrl}
            </div>
            Anyone with the link can practise. Nothing is asked of them and nothing is stored about them.
          </div>

          <div className="notice">
            <strong className="hz-ui">Your own vocabulary.</strong> Copy this table, replace the chunks with the words
            your class is learning, then publish. Students get a new link; this album stays as it is.
            <div style={{ marginTop: "var(--s3)" }}>
              <a className="press press--zhu" href={`/new?from=${album.id}`}>
                <span className="press__hz">刻一张</span> copy and add your words
              </a>
            </div>
          </div>

          <ControlStrip />
        </aside>
      </div>
    </div>
  );
}
