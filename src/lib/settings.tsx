import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export interface Settings {
  pinyin: boolean;
  english: boolean;
  rate: number;
  theme: "day" | "night";
}

const DEFAULTS: Settings = { pinyin: true, english: true, rate: 1, theme: "day" };
const KEY = "jupu.settings.v1";

interface Ctx extends Settings {
  set: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  toggle: (key: "pinyin" | "english") => void;
}

const SettingsContext = createContext<Ctx>({ ...DEFAULTS, set: () => {}, toggle: () => {} });

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) } : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(settings));
    } catch {
      /* storage may be unavailable; settings then last for the session only */
    }
    document.documentElement.dataset.theme = settings.theme === "night" ? "night" : "day";
  }, [settings]);

  const value = useMemo<Ctx>(
    () => ({
      ...settings,
      set: (key, v) => setSettings((s) => ({ ...s, [key]: v })),
      toggle: (key) => setSettings((s) => ({ ...s, [key]: !s[key] })),
    }),
    [settings],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): Ctx {
  return useContext(SettingsContext);
}
