/**
 * Mandarin audio, in two tiers: the Worker's cached neural voice first, the
 * browser's own zh-CN voice if that is unavailable. Audio is never required to
 * finish an activity, so every failure here is silent from the student's side.
 */

const cache = new Map<string, string>();
let current: HTMLAudioElement | null = null;
let serverVoiceWorks = true;

export function stopSpeaking(): void {
  if (current) {
    current.pause();
    current = null;
  }
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

export async function speak(text: string, rate = 1): Promise<void> {
  stopSpeaking();
  const clean = text.trim();
  if (!clean) return;

  if (serverVoiceWorks) {
    try {
      const src = cache.get(clean) ?? (await fetchVoice(clean));
      cache.set(clean, src);
      const el = new Audio(src);
      el.playbackRate = rate;
      current = el;
      await el.play();
      return;
    } catch {
      serverVoiceWorks = false;
    }
  }
  browserVoice(clean, rate);
}

async function fetchVoice(text: string): Promise<string> {
  const res = await fetch(`/api/speak?t=${encodeURIComponent(text)}`);
  if (!res.ok) throw new Error("speak_failed");
  return URL.createObjectURL(await res.blob());
}

function browserVoice(text: string, rate: number): void {
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = rate * 0.9;
  const zh = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("zh"));
  if (zh) utterance.voice = zh;
  window.speechSynthesis.speak(utterance);
}

/** Two short taps for a correct stamp, one flat thud for a wrong one. */
let ctx: AudioContext | null = null;

export function chime(kind: "ink" | "smudge"): void {
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = kind === "ink" ? "triangle" : "sine";
    osc.frequency.setValueAtTime(kind === "ink" ? 520 : 150, now);
    osc.frequency.exponentialRampToValueAtTime(kind === "ink" ? 780 : 90, now + 0.09);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(kind === "ink" ? 0.06 : 0.09, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  } catch {
    // Audio is decoration here; a blocked AudioContext changes nothing.
  }
}
