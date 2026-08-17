import { useState } from "react";
import { SEED_ALBUMS } from "../data/seed";
import { totalSentences } from "../lib/builder";
import { discard, shelf } from "../lib/store";
import { Nameplate } from "../components/atoms";

/** 书架. Built-in albums, then whatever this browser has authored. */
export function Library() {
  const [mine, setMine] = useState(shelf());

  return (
    <div className="shell">
      <header className="row row--between row--wrap" style={{ marginBottom: "var(--s6)" }}>
        <Nameplate />
        <a className="press press--zhu" href="/new">
          <span className="press__hz">刻一张</span> author an album
        </a>
      </header>

      <div className="stack" style={{ gap: "var(--s6)" }}>
        <section>
          <div className="row row--between" style={{ marginBottom: "var(--s3)" }}>
            <h1 className="hz" style={{ fontSize: "1.75rem", margin: 0 }}>
              现成的谱
            </h1>
            <span className="label">Ready to use</span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 1,
              background: "var(--edge-soft)",
              border: "1px solid var(--edge)",
            }}
          >
            {SEED_ALBUMS.map((album) => (
              <div
                key={album.id}
                style={{ background: "var(--bone)", padding: "var(--s4)", display: "flex", flexDirection: "column", gap: "var(--s3)" }}
              >
                <a href={`/a/${album.id}`} style={{ textDecoration: "none" }}>
                  <div className="hz" style={{ fontSize: "1.625rem", color: "var(--zhu)" }}>
                    {album.title}
                  </div>
                  <div className="label" style={{ marginTop: 2 }}>
                    {album.titleEn}
                  </div>
                  <div className="gloss" style={{ marginTop: "var(--s2)" }}>
                    {album.frames.length} frames · {totalSentences(album).toLocaleString()} sentences
                  </div>
                </a>
                <a className="press press--quiet" href={`/new?from=${album.id}`}>
                  copy and add your words
                </a>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="row row--between" style={{ marginBottom: "var(--s3)" }}>
            <h2 className="hz" style={{ fontSize: "1.75rem", margin: 0 }}>
              我的谱
            </h2>
            <span className="label">Kept in this browser</span>
          </div>

          {!mine.length ? (
            <div className="notice">
              Nothing here yet. Copy a ready-made table and put your class's words in, or start empty. Publishing gives
              you a class link plus a private edit link — that link is the only way back in from another device, so keep
              it somewhere.
              <div className="row row--wrap" style={{ marginTop: "var(--s3)" }}>
                {SEED_ALBUMS.map((album) => (
                  <a key={album.id} className="press" href={`/new?from=${album.id}`}>
                    <span className="press__hz">{album.title}</span>
                  </a>
                ))}
                <a className="press press--quiet" href="/new">
                  start empty
                </a>
              </div>
            </div>
          ) : (
            <div className="stack stack--tight">
              {mine.map((entry) => (
                <div
                  key={entry.album.id}
                  className="row row--between row--wrap plate"
                  style={{ padding: "var(--s3) var(--s4)" }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div className="hz" style={{ fontSize: "1.375rem" }}>
                      {entry.album.title || "（未命名）"}
                    </div>
                    <div className="gloss">
                      {entry.album.titleEn || "untitled"} · {totalSentences(entry.album).toLocaleString()} sentences ·{" "}
                      {entry.remoteId ? "published" : "draft, not published"}
                    </div>
                  </div>
                  <div className="row row--wrap">
                    {entry.remoteId && (
                      <a className="press press--quiet" href={`/a/${entry.remoteId}`}>
                        open
                      </a>
                    )}
                    <a className="press press--quiet" href={`/new?from=${entry.remoteId ?? entry.album.id}`}>
                      copy
                    </a>
                    <a
                      className="press"
                      href={
                        entry.remoteId && entry.editKey
                          ? `/edit/${entry.remoteId}?k=${entry.editKey}`
                          : `/edit/${entry.album.id}`
                      }
                    >
                      <span className="press__hz">修改</span> edit
                    </a>
                    <button
                      type="button"
                      className="press press--quiet"
                      onClick={() => {
                        discard(entry.album.id);
                        setMine(shelf());
                      }}
                    >
                      remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
