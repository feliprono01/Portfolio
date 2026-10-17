import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DEFAULT_SKIN, type SkinId } from "@/lib/skins";

export const STORE_KEY = "fp-portfolio";

interface AppState {
  skin: SkinId;
  soundEnabled: boolean;
  musicEnabled: boolean;
  crtEnabled: boolean;
  achievements: string[];
  /** False until the persisted store has been read from localStorage — gates
   *  anything (like achievement-watching) that must not run on stale/default
   *  state and double-fire for returning visitors. */
  hydrated: boolean;
  /** Speedrun: when the current attempt started (not persisted — resets each
   *  visit to the hub) and the best completed time ever recorded. */
  runStartedAt: number | null;
  bestTimeMs: number | null;
  setSkin: (skin: SkinId) => void;
  toggleSound: () => void;
  toggleMusic: () => void;
  toggleCrt: () => void;
  setHydrated: () => void;
  /** Returns true only the first time an achievement is unlocked. */
  unlock: (id: string) => boolean;
  startRun: () => void;
  /** Ends the active run (if any) and returns { elapsedMs, isNewBest }, or null if no run was active. */
  finishRun: () => { elapsedMs: number; isNewBest: boolean } | null;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      skin: DEFAULT_SKIN,
      soundEnabled: false,
      musicEnabled: false,
      crtEnabled: true,
      achievements: [],
      hydrated: false,
      runStartedAt: null,
      bestTimeMs: null,
      setSkin: (skin) => set({ skin }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleMusic: () => set((s) => ({ musicEnabled: !s.musicEnabled })),
      toggleCrt: () => set((s) => ({ crtEnabled: !s.crtEnabled })),
      setHydrated: () => set({ hydrated: true }),
      unlock: (id) => {
        if (get().achievements.includes(id)) return false;
        set((s) => ({ achievements: [...s.achievements, id] }));
        return true;
      },
      startRun: () => set({ runStartedAt: Date.now() }),
      finishRun: () => {
        const { runStartedAt, bestTimeMs } = get();
        if (runStartedAt === null) return null;
        const elapsedMs = Date.now() - runStartedAt;
        const isNewBest = bestTimeMs === null || elapsedMs < bestTimeMs;
        set({ runStartedAt: null, bestTimeMs: isNewBest ? elapsedMs : bestTimeMs });
        return { elapsedMs, isNewBest };
      },
    }),
    {
      name: STORE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Rehydrated after mount (StoreHydrator) so server and first client
      // render agree and React doesn't report a hydration mismatch.
      skipHydration: true,
      partialize: ({ skin, soundEnabled, musicEnabled, crtEnabled, achievements, bestTimeMs }) => ({
        skin,
        soundEnabled,
        musicEnabled,
        crtEnabled,
        achievements,
        bestTimeMs,
      }),
    }
  )
);
