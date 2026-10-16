import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type SkinId = "phosphor" | "gameboy" | "earth" | "arcade";

export const STORE_KEY = "fp-portfolio";
export const DEFAULT_SKIN: SkinId = "phosphor";

interface AppState {
  skin: SkinId;
  soundEnabled: boolean;
  crtEnabled: boolean;
  achievements: string[];
  setSkin: (skin: SkinId) => void;
  toggleSound: () => void;
  toggleCrt: () => void;
  /** Returns true only the first time an achievement is unlocked. */
  unlock: (id: string) => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      skin: DEFAULT_SKIN,
      soundEnabled: false,
      crtEnabled: true,
      achievements: [],
      setSkin: (skin) => set({ skin }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleCrt: () => set((s) => ({ crtEnabled: !s.crtEnabled })),
      unlock: (id) => {
        if (get().achievements.includes(id)) return false;
        set((s) => ({ achievements: [...s.achievements, id] }));
        return true;
      },
    }),
    {
      name: STORE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Rehydrated after mount (StoreHydrator) so server and first client
      // render agree and React doesn't report a hydration mismatch.
      skipHydration: true,
      partialize: ({ skin, soundEnabled, crtEnabled, achievements }) => ({
        skin,
        soundEnabled,
        crtEnabled,
        achievements,
      }),
    }
  )
);
