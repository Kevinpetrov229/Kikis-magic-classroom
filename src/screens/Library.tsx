import { useState } from "react";
import { SEED_ALBUMS } from "../data/seed";
import { totalSentences } from "../lib/builder";
import { discard, shelf } from "../lib/store";
import { Nameplate } from "../components/atoms";

/** Ready-made albums, then whatever this browser has authored. */
export function Library() {
  const [mine, setMine] = useState(shelf());

  return (
    <div className="shell">
      <header className="row row--between row--wrap" style={{ marginBottom: "var(--s6)" }}>
        <Nameplate />
        <a className="press press--zhu" href="/new">
          Make an album
        </a>
      </header>

      <div className="stack" style={{ gap: "var(--s6)" }}>
        <section>
          <div className="row row--between" style={{ marginBottom: "var(--s3)" }}>
            <h1 style={{ fontSize: "1.5rem", margin: 0, fontWeight: 700 }}>Ready-made albums</h1>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 1,
              background: "var(--edge-soft)",
              border: "1px solid var(--edge)",
              borderRadius: "var(--radius)",
              overflow: "hidden",
            }}
          >
            {SEED_ALBUMS.map((album) => (
              <div
                key={album.id}
                style={{ background: "var(--bone)", padding: "var(--s4)", display: "flex", flexDirection: "column", gap: "var(--s3)" }}
              >
                <a href={`/a/${album.id}`} style={{ textDecoration: "none" }}>
                  <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)" }}>{album.titleEn}</div>
                  <div className="hz" style={{ fontSize: "1.125rem", color: "var(--zhu)", marginTop: 2 }}>
                    {album.title}
                  </div>
                  <div className="gloss" style={{ marginTop: "var(--s2)" }}>
                    {totalSentences(album).toLocaleString()} sentences
                  </div>
                </a>
                <a className="press press--quiet" href={`/new?from=${album.id}`}>
                  Use with my words
                </a>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="row row--between" style={{ marginBottom: "var(--s3)" }}>
            <h2 style={{ fontSize: "1.5rem", margin: 0, fontWeight: 700 }}>My albums</h2>
            <span className="label">Saved in this browser</span>
          </div>

          {!mine.length ? (
            <div className="notice">
              Nothing here yet. Copy a ready-made table and put your class’s words in, or start empty. Publishing gives
              you a class link plus a private edit link — keep that edit link; it is the only way back in from another
              device.
              <div className="row row--wrap" style={{ marginTop: "var(--s3)" }}>
                {SEED_ALBUMS.map((album) => (
                  <a key={album.id} className="press" href={`/new?from=${album.id}`}>
                    {album.titleEn}
                  </a>
                ))}
                <a className="press press--quiet" href="/new">
                  Start empty
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
                    <div style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                      {entry.album.titleEn || entry.album.title || "Untitled"}
                    </div>
                    <div className="gloss">
                      {entry.album.title ? <span className="hz">{entry.album.title}</span> : null}
                      {entry.album.title ? " · " : ""}
                      {totalSentences(entry.album).toLocaleString()} sentences ·{" "}
                      {entry.remoteId ? "published" : "draft"}
                    </div>
                  </div>
                  <div className="row row--wrap">
                    {entry.remoteId && (
                      <a className="press press--quiet" href={`/a/${entry.remoteId}`}>
                        Open
                      </a>
                    )}
                    <a className="press press--quiet" href={`/new?from=${entry.remoteId ?? entry.album.id}`}>
                      Copy
                    </a>
                    <a
                      className="press"
                      href={
                        entry.remoteId && entry.editKey
                          ? `/edit/${entry.remoteId}?k=${entry.editKey}`
                          : `/edit/${entry.album.id}`
                      }
                    >
                      Edit
                    </a>
                    <button
                      type="button"
                      className="press press--quiet"
                      onClick={() => {
                        discard(entry.album.id);
                        setMine(shelf());
                      }}
                    >
                      Remove
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
