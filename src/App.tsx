import { useEffect, useState } from "react";
import type { Album } from "./lib/types";
import { ACTIVITIES } from "./data/seed";
import { cloneAlbum } from "./lib/builder";
import { keep, resolveAlbum, seedAlbum, shelfEntry } from "./lib/store";
import { Nameplate } from "./components/atoms";
import { Home } from "./screens/Home";
import { Library } from "./screens/Library";
import { AlbumCover } from "./screens/AlbumCover";
import { Editor, newAlbum } from "./screens/Editor";
import { Reader } from "./screens/Reader";
import { Jumble } from "./activities/Jumble";
import { Missing } from "./activities/Missing";
import { Match } from "./activities/Match";
import { Trapdoor } from "./activities/Trapdoor";
import { Typing } from "./activities/Typing";
import { Cloze } from "./activities/Cloze";
import { Order } from "./activities/Order";
import { Trace } from "./activities/Trace";

/**
 * Paths, not hashes, so a class link looks like a link. Anchors are intercepted
 * for in-app navigation; anything external or modified falls through to the
 * browser.
 */
function useLocation(): { path: string; search: string } {
  const read = () => ({ path: location.pathname, search: location.search });
  const [loc, setLoc] = useState(read);

  useEffect(() => {
    const onPop = () => setLoc(read());
    window.addEventListener("popstate", onPop);

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href?.startsWith("/") || anchor.target === "_blank") return;
      event.preventDefault();
      const url = new URL(href, location.origin);
      history.pushState(null, "", url.pathname + url.search);
      setLoc({ path: url.pathname, search: url.search });
      window.scrollTo(0, 0);
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return loc;
}

export function App() {
  const { path, search } = useLocation();
  const segments = path.split("/").filter(Boolean);
  const params = new URLSearchParams(search);

  if (segments.length === 0) return <Home />;
  if (segments[0] === "library") return <Library />;
  if (segments[0] === "new") return <NewGate from={params.get("from")} />;

  if (segments[0] === "edit" && segments[1]) {
    return <EditGate id={segments[1]} editKey={params.get("k")} />;
  }
  if (segments[0] === "a" && segments[1]) return <AlbumGate id={segments[1]} activity={segments[2]} />;

  return (
    <Missing404 />
  );
}

function AlbumGate({ id, activity }: { id: string; activity?: string }) {
  const album = useAlbum(id);
  if (album === "loading") return <Waiting />;
  if (!album) return <Missing404 />;

  if (!activity) return <AlbumCover album={album} />;
  if (activity === "read") return <Reader album={album} />;

  switch (activity) {
    case "jumble":
      return <Jumble album={album} />;
    case "missing":
      return <Missing album={album} />;
    case "match":
      return <Match album={album} />;
    case "trapdoor":
      return <Trapdoor album={album} />;
    case "typing":
      return <Typing album={album} />;
    case "cloze":
      return <Cloze album={album} />;
    case "order":
      return <Order album={album} />;
    case "trace":
      return <Trace album={album} />;
    default:
      return <AlbumCover album={album} />;
  }
}

function NewGate({ from }: { from: string | null }) {
  const album = useAlbum(from ?? "");
  if (!from) return <Editor initial={newAlbum()} />;
  if (album === "loading") return <Waiting />;
  if (!album) return <Editor initial={newAlbum()} />;
  return <ClonedEditor source={album} />;
}

function ClonedEditor({ source }: { source: Album }) {
  const [draft] = useState(() => cloneAlbum(source));
  return <Editor initial={draft} clonedFrom={source.title} />;
}

function EditGate({ id, editKey }: { id: string; editKey: string | null }) {
  const local = shelfEntry(id);
  const remote = useAlbum(local && !editKey ? "" : id);

  if (local && (!editKey || local.editKey === editKey)) {
    return <Editor initial={local.album} />;
  }

  if (editKey) {
    if (remote === "loading") return <Waiting />;
    if (!remote) return <Missing404 />;
    return <AdoptedEditor album={remote} remoteId={id} editKey={editKey} />;
  }

  const seed = seedAlbum(id);
  if (seed) return <ClonedEditor source={seed} />;

  if (remote === "loading") return <Waiting />;
  if (!remote) return <Missing404 />;

  return (
    <div className="shell">
      <Nameplate />
      <div className="stack" style={{ marginTop: "var(--s7)", maxWidth: 560 }}>
        <h1 style={{ fontSize: "1.75rem", margin: 0, fontWeight: 700 }}>
          This is the class copy.
        </h1>
        <p className="translation" style={{ margin: 0 }}>
          To put your own vocabulary in, copy the table — the original stays as it is.
        </p>
        <div className="row row--wrap">
          <a className="press press--zhu" href={`/new?from=${id}`}>
            Use with my words
          </a>
          <a className="press press--quiet" href={`/a/${id}`}>
            Open the class album
          </a>
        </div>
      </div>
    </div>
  );
}

function AdoptedEditor({ album, remoteId, editKey }: { album: Album; remoteId: string; editKey: string }) {
  useState(() => {
    keep(album, { remoteId, editKey });
    return true;
  });
  return <Editor initial={album} />;
}

function useAlbum(id: string): Album | null | "loading" {
  const [album, setAlbum] = useState<Album | null | "loading">(id ? "loading" : null);

  useEffect(() => {
    if (!id) return;
    let live = true;
    setAlbum("loading");
    void resolveAlbum(id).then((found) => live && setAlbum(found));
    return () => {
      live = false;
    };
  }, [id]);

  return album;
}

function Waiting() {
  return (
    <div className="shell">
      <Nameplate />
      <div className="stack" style={{ marginTop: "var(--s6)" }}>
        <span className="grinding">fetching the album</span>
        <div className="ghost ghost--wide" style={{ width: "100%", minHeight: 220 }} />
      </div>
    </div>
  );
}

function Missing404() {
  return (
    <div className="shell">
      <Nameplate />
      <div className="stack" style={{ marginTop: "var(--s7)", maxWidth: 560 }}>
        <span className="impression" aria-hidden="true">
          <span className="impression__hz">无</span>
        </span>
        <h1 style={{ fontSize: "1.75rem", margin: 0, fontWeight: 700 }}>
          Album not found.
        </h1>
        <p className="translation" style={{ margin: 0 }}>
          There is no album at this link. It may have been mistyped, or the album was never published. Ready-made
          albums are in the album list, and every album’s games live on its cover page.
        </p>
        <div className="row row--wrap">
          <a className="press press--zhu" href="/library">
            Albums
          </a>
          <a className="press press--quiet" href="/">
            Home
          </a>
        </div>
        <p className="label">
          {ACTIVITIES.length + 1} activity types are generated from every album
        </p>
      </div>
    </div>
  );
}
