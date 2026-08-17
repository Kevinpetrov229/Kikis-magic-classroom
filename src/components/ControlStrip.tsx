import { useSettings } from "../lib/settings";

/** Study toggles: what is annotated, not what is asked. */
export function ControlStrip() {
  const { pinyin, english, rate, theme, set, toggle } = useSettings();

  return (
    <div className="row row--wrap" style={{ justifyContent: "flex-end", gap: "var(--s2)" }}>
      <button
        type="button"
        className={`press ${pinyin ? "" : "press--quiet"}`}
        aria-pressed={pinyin}
        onClick={() => toggle("pinyin")}
      >
        Pinyin
      </button>
      <button
        type="button"
        className={`press ${english ? "" : "press--quiet"}`}
        aria-pressed={english}
        onClick={() => toggle("english")}
      >
        English
      </button>
      <button
        type="button"
        className="press press--quiet"
        onClick={() => set("rate", rate === 1 ? 0.7 : rate === 0.7 ? 1.3 : 1)}
        title="Playback speed"
      >
        <span className="num">{rate.toFixed(1)}×</span>
      </button>
      <button
        type="button"
        className="press press--quiet"
        onClick={() => set("theme", theme === "night" ? "day" : "night")}
        title="Day or night"
      >
        {theme === "night" ? "Light" : "Dark"}
      </button>
    </div>
  );
}
