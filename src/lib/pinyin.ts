/**
 * pinyin-pro carries a dictionary, so it is loaded on demand — the teacher only
 * needs it while authoring, and a student practising never downloads it.
 */
let loader: Promise<typeof import("pinyin-pro")> | null = null;

function load() {
  loader ??= import("pinyin-pro");
  return loader;
}

export async function toPinyin(hz: string): Promise<string> {
  if (!/[\u4e00-\u9fff]/.test(hz)) return "";
  const { pinyin } = await load();
  return pinyin(hz, { toneType: "symbol", type: "string", nonZh: "consecutive" }).trim();
}

/** Per-character pinyin, for annotating a single hanzi under the tracing grid. */
export async function charPinyin(ch: string): Promise<string> {
  const { pinyin } = await load();
  return pinyin(ch, { toneType: "symbol", type: "string" }).trim();
}
