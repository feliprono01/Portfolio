/**
 * Tiny 8-bit sound effects synthesized with the Web Audio API — no audio
 * files, 0 extra KB. The AudioContext is created lazily on first play
 * (browsers refuse to start one before a user gesture, and every call
 * site here is already inside a click handler).
 */

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

interface Tone {
  freq: number;
  start: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
}

function playTones(tones: Tone[]) {
  const audioCtx = getContext();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;

  for (const tone of tones) {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = tone.type ?? "square";
    osc.frequency.value = tone.freq;

    const peak = tone.gain ?? 0.08;
    const t0 = now + tone.start;
    const t1 = t0 + tone.duration;
    gainNode.gain.setValueAtTime(0, t0);
    gainNode.gain.linearRampToValueAtTime(peak, t0 + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, t1);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start(t0);
    osc.stop(t1 + 0.02);
  }
}

export function playClick() {
  playTones([{ freq: 520, start: 0, duration: 0.05, type: "square", gain: 0.05 }]);
}

export function playUnlock() {
  playTones([
    { freq: 523, start: 0, duration: 0.09, type: "square" },
    { freq: 659, start: 0.08, duration: 0.09, type: "square" },
    { freq: 784, start: 0.16, duration: 0.18, type: "square" },
  ]);
}

export function playPowerUp() {
  playTones([
    { freq: 392, start: 0, duration: 0.07, type: "square" },
    { freq: 523, start: 0.06, duration: 0.07, type: "square" },
    { freq: 659, start: 0.12, duration: 0.07, type: "square" },
    { freq: 784, start: 0.18, duration: 0.07, type: "square" },
    { freq: 1047, start: 0.24, duration: 0.22, type: "square" },
  ]);
}

export function playError() {
  playTones([
    { freq: 180, start: 0, duration: 0.14, type: "sawtooth", gain: 0.06 },
    { freq: 140, start: 0.1, duration: 0.18, type: "sawtooth", gain: 0.06 },
  ]);
}
