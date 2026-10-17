"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { startMusic, stopMusic } from "@/lib/music";

/**
 * Starts/stops the synthesized chiptune loop whenever `musicEnabled`
 * flips. Independent from the SFX toggle on purpose — a looping background
 * track is a bigger commitment than a click blip, so it gets its own
 * explicit opt-in, off by default.
 */
export default function BackgroundMusic() {
  const musicEnabled = useAppStore((s) => s.musicEnabled);

  useEffect(() => {
    if (musicEnabled) {
      startMusic();
      return stopMusic;
    }
    stopMusic();
  }, [musicEnabled]);

  return null;
}
