import type { Album } from "./types";
import { SEED_ALBUMS } from "../data/seed";

const KEY = "jupu.library.v1";

export interface Shelf {
  album: Album;
  /** Present once the album has been published; lets this browser keep editing it. */
  remoteId?: string;
  editKey?: string;
}

function read(): Shelf[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Shelf[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(shelves: Shelf[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(shelves));
  } catch {
    // A full or blocked storage quota must never break the activities.
  }
}

export function shelf(): Shelf[] {
  return read();
}

export function shelfEntry(id: string): Shelf | undefined {
  return read().find((s) => s.album.id === id || s.remoteId === id);
}

export function keep(album: Album, extra: Partial<Shelf> = {}): void {
  const shelves = read();
  const index = shelves.findIndex((s) => s.album.id === album.id);
  const entry: Shelf = { ...(index >= 0 ? shelves[index] : {}), ...extra, album };
  if (index >= 0) shelves[index] = entry;
  else shelves.unshift(entry);
  write(shelves);
}

export function discard(id: string): void {
  write(read().filter((s) => s.album.id !== id));
}

/* ---------- built-in albums ---------------------------------------------- */

export function seedAlbum(id: string): Album | undefined {
  return SEED_ALBUMS.find((a) => a.id === id);
}

/* ---------- the network ------------------------------------------------- */

async function failure(res: Response, fallback: string): Promise<Error> {
  const body = (await res.json().catch(() => ({}))) as { error?: string };
  return new Error(body.error ?? fallback);
}

export async function publish(album: Album): Promise<{ id: string; editKey: string; album: Album }> {
  const res = await fetch("/api/albums", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(album),
  });
  if (!res.ok) throw await failure(res, "publish_failed");
  return (await res.json()) as { id: string; editKey: string; album: Album };
}

export async function republish(id: string, editKey: string, album: Album): Promise<Album> {
  const res = await fetch(`/api/albums/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json", "x-edit-key": editKey },
    body: JSON.stringify(album),
  });
  if (!res.ok) throw await failure(res, "update_failed");
  return ((await res.json()) as { album: Album }).album;
}

/**
 * Resolve an id from a link: a built-in album, then this browser's shelf, then KV.
 * A student arriving cold hits the third path and needs nothing else.
 */
export async function resolveAlbum(id: string): Promise<Album | null> {
  const built = seedAlbum(id);
  if (built) return built;

  const local = shelfEntry(id);
  if (local) return local.album;

  const res = await fetch(`/api/albums/${id}`);
  if (!res.ok) return null;
  return ((await res.json()) as { album: Album }).album;
}
