/**
 * Looping chiptune background track, synthesized with the Web Audio API —
 * same reasoning as lib/sfx.ts: no audio file, no extra weight, no
 * licensing question. Uses a lookahead scheduler (the standard pattern for
 * reliable Web Audio timing) instead of naive setInterval-per-note.
 */

let ctx: AudioContext | null = null;
let schedulerId: number | null = null;
let nextNoteTime = 0;
let noteIndex = 0;
let masterGain: GainNode | null = null;

const TEMPO = 132; // BPM
const STEP = 60 / TEMPO / 2; // eighth notes
const LOOKAHEAD_MS = 100;
const SCHEDULE_AHEAD_S = 0.25;

// A short, cheerful 8-bit arpeggio loop (frequencies in Hz). Bass plays
// every 4th step under the lead.
const LEAD = [523, 659, 784, 659, 587, 698, 880, 698, 523, 659, 784, 988, 880, 784, 659, 523];
const BASS = [131, 0, 0, 0, 147, 0, 0, 0, 165, 0, 0, 0, 147, 0, 0, 0];

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) {
    ctx = new Ctor();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.05;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function playNote(freq: number, time: number, duration: number, type: OscillatorType, gain: number) {
  if (!ctx || !masterGain || freq <= 0) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, time);
  g.gain.linearRampToValueAtTime(gain, time + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  osc.connect(g);
  g.connect(masterGain);
  osc.start(time);
  osc.stop(time + duration + 0.02);
}

function scheduler() {
  if (!ctx) return;
  while (nextNoteTime < ctx.currentTime + SCHEDULE_AHEAD_S) {
    const i = noteIndex % LEAD.length;
    playNote(LEAD[i], nextNoteTime, STEP * 0.85, "square", 1);
    if (BASS[i] > 0) playNote(BASS[i], nextNoteTime, STEP * 3.5, "triangle", 1.4);
    nextNoteTime += STEP;
    noteIndex += 1;
  }
  schedulerId = window.setTimeout(scheduler, LOOKAHEAD_MS);
}

export function startMusic() {
  const audioCtx = getContext();
  if (!audioCtx || schedulerId !== null) return;
  noteIndex = 0;
  nextNoteTime = audioCtx.currentTime + 0.1;
  scheduler();
}

export function stopMusic() {
  if (schedulerId !== null) {
    clearTimeout(schedulerId);
    schedulerId = null;
  }
}
