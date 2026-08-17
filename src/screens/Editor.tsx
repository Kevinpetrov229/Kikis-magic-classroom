import { useEffect, useMemo, useState } from "react";
import type { Album, Chunk, Column, Frame } from "../lib/types";
import { newId, rng, sampleSentences, totalSentences, cloneAlbum } from "../lib/builder";
import { toPinyin } from "../lib/pinyin";
import { discard, keep, publish, republish, shelfEntry } from "../lib/store";
import { Nameplate } from "../components/atoms";
import { SEED_ALBUMS } from "../data/seed";

const blankChunk = (): Chunk => ({ id: newId(), hz: "", py: "", en: "" });

const blankColumn = (n: number): Column => ({
  id: newId("col"),
  label: "",
  labelEn: `Column ${n}`,
  chunks: [blankChunk()],
});

const blankFrame = (n: number): Frame => ({
  id: newId("fr"),
  label: "",
  labelEn: n === 1 ? "Affirmative" : `Frame ${n}`,
  columns: [blankColumn(1), blankColumn(2), blankColumn(3)],
});

export function newAlbum(): Album {
  return {
    id: newId("draft"),
    title: "",
    titleEn: "",
    note: "",
    frames: [blankFrame(1)],
    created: Date.now(),
    updated: Date.now(),
  };
}

/**
 * The authoring surface. Everything a teacher types is her own Chinese; the only
 * thing generated for her is pinyin, and that stays editable.
 */
export function Editor({ initial, clonedFrom }: { initial: Album; clonedFrom?: string }) {
  const [album, setAlbum] = useState<Album>(initial);
  const [links, setLinks] = useState<{ share: string; edit: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const [copiedFrom, setCopiedFrom] = useState(clonedFrom);
  const existing = shelfEntry(album.id);

  // Opening this page is not authoring. Nothing reaches the shelf until there is
  // something on the page worth coming back to, or the shelf fills with blanks
  // every time a teacher looks and leaves.
  const started =
    !!album.title.trim() ||
    !!album.titleEn.trim() ||
    album.frames.some((f) => f.columns.some((c) => c.chunks.some((ch) => ch.hz.trim())));

  const onShelf = !!existing;

  useEffect(() => {
    if (!started && !onShelf) return;
    const timer = setTimeout(() => keep({ ...album, updated: Date.now() }), 600);
    return () => clearTimeout(timer);
  }, [album, started, onShelf]);

  const preview = useMemo(() => {
    const usable = album.frames.every((f) => f.columns.every((c) => c.chunks.some((ch) => ch.hz.trim())));
    if (!usable) return null;
    const clean: Album = {
      ...album,
      frames: album.frames.map((f) => ({
        ...f,
        columns: f.columns.map((c) => ({ ...c, chunks: c.chunks.filter((ch) => ch.hz.trim()) })),
      })),
    };
    return sampleSentences(clean, 3, rng(`preview:${JSON.stringify(clean).length}`));
  }, [album]);

  function edit(mutate: (draft: Album) => void) {
    setAlbum((current) => {
      const draft: Album = structuredClone(current);
      mutate(draft);
      return draft;
    });
  }

  async function fillPinyin(frameIndex: number, columnIndex: number, chunkIndex: number, hz: string) {
    const py = await toPinyin(hz);
    edit((draft) => {
      const chunk = draft.frames[frameIndex]?.columns[columnIndex]?.chunks[chunkIndex];
      if (chunk && !chunk.py.trim()) chunk.py = py;
    });
  }

  async function bulk(frameIndex: number, columnIndex: number, raw: string) {
    const lines = raw
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const parsed: Chunk[] = [];
    for (const line of lines) {
      const parts = line.split(/\s*[|\t]\s*/);
      const hz = parts[0];
      if (!hz) continue;
      const py = parts.length >= 3 ? parts[1] : await toPinyin(hz);
      const en = parts.length >= 3 ? parts[2] : (parts[1] ?? "");
      parsed.push({ id: newId(), hz, py, en });
    }
    if (!parsed.length) return;
    edit((draft) => {
      const column = draft.frames[frameIndex].columns[columnIndex];
      const kept = column.chunks.filter((c) => c.hz.trim());
      column.chunks = [...kept, ...parsed];
    });
  }

  async function save() {
    setProblem(null);
    if (!album.title.trim()) return setProblem("The album needs a Chinese title before it can be shared.");
    const empty = album.frames.some((f) => f.columns.some((c) => !c.chunks.some((ch) => ch.hz.trim())));
    if (empty) return setProblem("Every column needs at least one chunk with Chinese in it.");

    const clean: Album = {
      ...album,
      titleEn: album.titleEn.trim() || album.title.trim(),
      frames: album.frames.map((f) => ({
        ...f,
        columns: f.columns.map((c) => ({ ...c, chunks: c.chunks.filter((ch) => ch.hz.trim()) })),
      })),
    };

    setBusy(true);
    try {
      if (existing?.remoteId && existing.editKey) {
        const saved = await republish(existing.remoteId, existing.editKey, clean);
        keep(saved, { remoteId: existing.remoteId, editKey: existing.editKey });
        const share = `${location.origin}/a/${existing.remoteId}`;
        const edit = `${location.origin}/edit/${existing.remoteId}?k=${existing.editKey}`;
        setLinks({ share, edit });
        history.replaceState(null, "", `/edit/${existing.remoteId}?k=${existing.editKey}`);
      } else {
        const { id, editKey, album: saved } = await publish(clean);
        discard(album.id);
        keep(saved, { remoteId: id, editKey });
        setAlbum(saved);
        const share = `${location.origin}/a/${id}`;
        const edit = `${location.origin}/edit/${id}?k=${editKey}`;
        setLinks({ share, edit });
        history.replaceState(null, "", `/edit/${id}?k=${editKey}`);
      }
    } catch {
      setProblem("Publishing failed. Your work is kept in this browser, so nothing is lost — try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="shell">
      <header className="row row--between row--wrap" style={{ marginBottom: "var(--s5)" }}>
        <Nameplate />
        <nav className="row row--wrap">
          <span className="label">
            {totalSentences(album).toLocaleString()} sentence{totalSentences(album) === 1 ? "" : "s"} so far
          </span>
          <a className="press press--quiet" href="/library">
            Albums
          </a>
          <button type="button" className="press press--zhu" onClick={() => void save()} disabled={busy}>
            {busy ? "Saving…" : existing?.remoteId ? "Update album" : "Publish and get a link"}
          </button>
        </nav>
      </header>

      {problem && <p className="notice notice--zhu">{problem}</p>}

      {copiedFrom && !links && (
        <p className="notice" style={{ marginBottom: "var(--s4)" }}>
          <strong>This is a copy.</strong> Copied from {copiedFrom}. Change the chunks to your class’s vocabulary — the
          original table is untouched. Publish when you want a class link of your own.
        </p>
      )}

      {!started && !copiedFrom && (
        <div className="notice" style={{ marginBottom: "var(--s4)" }}>
          <strong>Start from a ready-made table.</strong> Copy one below, then replace the chunks with your class’s
          words. Or fill the empty columns from scratch.
          <div className="row row--wrap" style={{ marginTop: "var(--s3)" }}>
            {SEED_ALBUMS.map((seed) => (
              <button
                key={seed.id}
                type="button"
                className="press"
                onClick={() => {
                  setCopiedFrom(seed.titleEn);
                  setAlbum(cloneAlbum(seed));
                }}
              >
                {seed.titleEn}
              </button>
            ))}
          </div>
        </div>
      )}

      {links && (
        <div className="notice" style={{ marginBottom: "var(--s4)" }}>
          <strong>Published.</strong>
          <div style={{ marginTop: "var(--s2)" }}>
            <div className="label">Class link — send this one</div>
            <div className="num" style={{ wordBreak: "break-all", color: "var(--ink)" }}>
              {links.share}
            </div>
          </div>
          <div style={{ marginTop: "var(--s2)" }}>
            <div className="label">Your edit link — keep this one private. It is the only way back in from another device.</div>
            <div className="num" style={{ wordBreak: "break-all", color: "var(--zhu)" }}>
              {links.edit}
            </div>
          </div>
          <div className="row row--wrap" style={{ marginTop: "var(--s3)" }}>
            <button
              type="button"
              className="press press--quiet"
              onClick={() => void navigator.clipboard.writeText(links.share)}
            >
              Copy class link
            </button>
            <button
              type="button"
              className="press press--quiet"
              onClick={() => void navigator.clipboard.writeText(links.edit)}
            >
              Copy edit link
            </button>
            <a className="press" href={links.share}>
              Open the album
            </a>
          </div>
        </div>
      )}

      <div className="spread">
        <div className="stack">
          <div className="plate">
            <div className="plate__head">
              <span className="label">The album</span>
            </div>
            <div className="plate__body stack stack--tight">
              <div className="row row--wrap" style={{ gap: "var(--s3)", alignItems: "flex-end" }}>
                <div className="field" style={{ flex: "1 1 220px" }}>
                  <label className="label" htmlFor="title">
                    Chinese title
                  </label>
                  <input
                    id="title"
                    className="input input--hz"
                    value={album.title}
                    placeholder="买礼物"
                    onChange={(e) => edit((d) => void (d.title = e.target.value))}
                  />
                </div>
                <div className="field" style={{ flex: "1 1 220px" }}>
                  <label className="label" htmlFor="titleEn">
                    English title
                  </label>
                  <input
                    id="titleEn"
                    className="input"
                    value={album.titleEn}
                    placeholder="Buying gifts"
                    onChange={(e) => edit((d) => void (d.titleEn = e.target.value))}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="note">
                  One line for the student, before they start
                </label>
                <input
                  id="note"
                  className="input"
                  value={album.note ?? ""}
                  placeholder="Give a present to someone and say what you think of the idea."
                  onChange={(e) => edit((d) => void (d.note = e.target.value))}
                />
              </div>
            </div>
          </div>

          {album.frames.map((frame, fi) => (
            <div className="plate" key={frame.id}>
              <div className="plate__head">
                <div className="row row--wrap" style={{ gap: "var(--s2)" }}>
                  <input
                    className="input input--hz"
                    style={{ width: 130, fontSize: "1.0625rem" }}
                    value={frame.label}
                    onChange={(e) => edit((d) => void (d.frames[fi].label = e.target.value))}
                    aria-label="Frame name in Chinese"
                  />
                  <input
                    className="input"
                    style={{ width: 150 }}
                    value={frame.labelEn ?? ""}
                    placeholder="Affirmative"
                    onChange={(e) => edit((d) => void (d.frames[fi].labelEn = e.target.value))}
                    aria-label="Frame name in English"
                  />
                </div>
                <div className="row row--wrap" style={{ gap: "var(--s2)" }}>
                  <span className="label num">
                    {frame.columns.reduce((n, c) => n * Math.max(c.chunks.filter((ch) => ch.hz.trim()).length, 1), 1)}
                  </span>
                  <button
                    type="button"
                    className="press press--quiet"
                    onClick={() =>
                      edit((d) => {
                        const copy: Frame = structuredClone(d.frames[fi]);
                        copy.id = newId("fr");
                        copy.label = copy.label ? `${copy.label}（副本）` : copy.label;
                        copy.labelEn = `${copy.labelEn || "Frame"} (copy)`;
                        copy.columns.forEach((col) => {
                          col.id = newId("col");
                          col.chunks.forEach((ch) => (ch.id = newId()));
                        });
                        d.frames.splice(fi + 1, 0, copy);
                      })
                    }
                  >
                    duplicate frame
                  </button>
                  {album.frames.length > 1 && (
                    <button
                      type="button"
                      className="press press--quiet"
                      onClick={() => edit((d) => void d.frames.splice(fi, 1))}
                    >
                      remove
                    </button>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(auto-fit, minmax(230px, 1fr))`,
                  gap: 1,
                  background: "var(--edge-soft)",
                }}
              >
                {frame.columns.map((column, ci) => (
                  <ColumnEditor
                    key={column.id}
                    column={column}
                    index={ci}
                    canRemove={frame.columns.length > 1}
                    onLabel={(field, value) => edit((d) => void (d.frames[fi].columns[ci][field] = value))}
                    onChunk={(chunkIndex, field, value) =>
                      edit((d) => void (d.frames[fi].columns[ci].chunks[chunkIndex][field] = value))
                    }
                    onBlurHz={(chunkIndex, hz) => void fillPinyin(fi, ci, chunkIndex, hz)}
                    onAddChunk={() => edit((d) => void d.frames[fi].columns[ci].chunks.push(blankChunk()))}
                    onRemoveChunk={(chunkIndex) => edit((d) => void d.frames[fi].columns[ci].chunks.splice(chunkIndex, 1))}
                    onRemoveColumn={() => edit((d) => void d.frames[fi].columns.splice(ci, 1))}
                    onBulk={(raw) => void bulk(fi, ci, raw)}
                  />
                ))}
              </div>

              <div className="row row--wrap" style={{ padding: "var(--s3) var(--s4)", borderTop: "1px solid var(--edge)" }}>
                <button
                  type="button"
                  className="press press--quiet"
                  onClick={() => edit((d) => void d.frames[fi].columns.push(blankColumn(d.frames[fi].columns.length + 1)))}
                >
                  add a column
                </button>
              </div>
            </div>
          ))}

          <div className="row">
            <button
              type="button"
              className="press"
              onClick={() => edit((d) => void d.frames.push(blankFrame(d.frames.length + 1)))}
            >
              add a frame
            </button>
          </div>
        </div>

        <aside className="stack">
          <div className="plate">
            <div className="plate__head">
              <span className="label">What the table produces</span>
            </div>
            <div className="plate__body stack stack--tight">
              {preview ? (
                preview.map((sentence, i) => (
                  <div key={i} style={{ paddingBottom: "var(--s2)", borderBottom: "1px solid var(--edge-soft)" }}>
                    <div className="hz" style={{ fontSize: "1.25rem" }}>
                      {sentence.hz}
                    </div>
                    <div className="py">{sentence.py}</div>
                    <div className="gloss">{sentence.en}</div>
                  </div>
                ))
              ) : (
                <p className="gloss" style={{ margin: 0 }}>
                  Fill at least one chunk in every column and sample sentences appear here.
                </p>
              )}
            </div>
          </div>

          <div className="notice">
            <strong className="hz-ui">Frames keep the Chinese correct.</strong> Every combination inside one frame has
            to work grammatically. Put an affirmative pattern in one frame and its negative in another, rather than
            mixing them in one table — duplicate the frame and change only the parts that differ.
          </div>

          <div className="notice notice--teng">
            <strong className="hz-ui">Paste a whole column.</strong> One line per chunk. Use{" "}
            <span className="num">汉字 | pīnyīn | english</span>, or just <span className="num">汉字 | english</span> and
            pinyin is filled in for you, or paste bare characters and both are.
          </div>

          <div className="row row--wrap">
            <span className="impression" aria-hidden="true">
              <span className="impression__hz">谱</span>
            </span>
            <p className="gloss" style={{ margin: 0, flex: 1 }}>
              Saved in this browser as you type. Publishing puts it on Cloudflare and gives you the class link.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

interface ColumnProps {
  column: Column;
  index: number;
  canRemove: boolean;
  onLabel: (field: "label" | "labelEn", value: string) => void;
  onChunk: (chunkIndex: number, field: "hz" | "py" | "en", value: string) => void;
  onBlurHz: (chunkIndex: number, hz: string) => void;
  onAddChunk: () => void;
  onRemoveChunk: (chunkIndex: number) => void;
  onRemoveColumn: () => void;
  onBulk: (raw: string) => void;
}

function ColumnEditor({
  column,
  index,
  canRemove,
  onLabel,
  onChunk,
  onBlurHz,
  onAddChunk,
  onRemoveChunk,
  onRemoveColumn,
  onBulk,
}: ColumnProps) {
  const [paste, setPaste] = useState("");
  const [pasting, setPasting] = useState(() => column.chunks.every((c) => !c.hz.trim()));

  return (
    <div style={{ background: "var(--bone)", padding: "var(--s3)" }}>
      <div className="stack stack--tight" style={{ marginBottom: "var(--s3)" }}>
        <div className="row" style={{ gap: "var(--s2)" }}>
          <span className="label label--zhu num">{String(index + 1).padStart(2, "0")}</span>
          <input
            className="input"
            style={{ fontFamily: "var(--hz-ui)", fontSize: "var(--t-small)" }}
            value={column.label ?? ""}
            placeholder="时间"
            onChange={(e) => onLabel("label", e.target.value)}
            aria-label="Column name in Chinese"
          />
        </div>
        <input
          className="input"
          style={{ fontSize: "var(--t-small)" }}
          value={column.labelEn ?? ""}
          placeholder="Time"
          onChange={(e) => onLabel("labelEn", e.target.value)}
          aria-label="Column name in English"
        />
      </div>

      <div className="stack stack--tight">
        {column.chunks.map((chunk, i) => (
          <div
            key={chunk.id}
            style={{ border: "1px solid var(--edge-soft)", borderRadius: "var(--radius-sm)", padding: "var(--s2)" }}
          >
            <input
              className="input input--hz"
              style={{ border: 0, padding: 0, background: "transparent" }}
              value={chunk.hz}
              placeholder="汉字"
              onChange={(e) => onChunk(i, "hz", e.target.value)}
              onBlur={(e) => e.target.value.trim() && onBlurHz(i, e.target.value.trim())}
              aria-label="Chinese"
              lang="zh-CN"
            />
            <input
              className="input py"
              style={{ border: 0, padding: 0, background: "transparent", color: "var(--qing)" }}
              value={chunk.py}
              placeholder="pīnyīn"
              onChange={(e) => onChunk(i, "py", e.target.value)}
              aria-label="Pinyin"
            />
            <div className="row" style={{ gap: "var(--s1)" }}>
              <input
                className="input"
                style={{ border: 0, padding: 0, background: "transparent", fontSize: "var(--t-label)" }}
                value={chunk.en}
                placeholder="english"
                onChange={(e) => onChunk(i, "en", e.target.value)}
                aria-label="English"
              />
              {column.chunks.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveChunk(i)}
                  className="label"
                  style={{ border: 0, background: "none", color: "var(--zhu)" }}
                  aria-label="Remove this chunk"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="row row--wrap" style={{ marginTop: "var(--s2)", gap: "var(--s1)" }}>
        <button type="button" className="press press--quiet" onClick={onAddChunk}>
          + chunk
        </button>
        <button type="button" className="press press--quiet" onClick={() => setPasting((p) => !p)}>
          paste
        </button>
        {canRemove && (
          <button type="button" className="press press--quiet" onClick={onRemoveColumn} aria-label="Remove this column">
            ✕ column
          </button>
        )}
      </div>

      {pasting && (
        <div className="stack stack--tight" style={{ marginTop: "var(--s2)" }}>
          <textarea
            className="textarea"
            style={{ minHeight: 92, fontSize: "var(--t-small)" }}
            value={paste}
            placeholder={"一盒巧克力 | a box of chocolates\n一张卡片 | a card"}
            onChange={(e) => setPaste(e.target.value)}
            aria-label="Paste chunks, one per line"
          />
          <button
            type="button"
            className="press press--zhu"
            onClick={() => {
              onBulk(paste);
              setPaste("");
              setPasting(false);
            }}
          >
            add these
          </button>
        </div>
      )}
    </div>
  );
}
