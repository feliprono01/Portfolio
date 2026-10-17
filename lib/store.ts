import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DEFAULT_SKIN, type SkinId } from "@/lib/skins";

export const STORE_KEY = "fp-portfolio";

interface AppState {
  skin: SkinId;
  soundEnabled: boolean;
  crtEnabled: boolean;
  achievements: string[];
  /** False until the persisted store has been read from localStorage — gates
   *  anything (like achievement-watching) that must not run on stale/default
   *  state and double-fire for returning visitors. */
  hydrated: boolean;
  setSkin: (skin: SkinId) => void;
  toggleSound: () => void;
  toggleCrt: () => void;
  setHydrated: () => void;
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
      hydrated: false,
      setSkin: (skin) => set({ skin }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      toggleCrt: () => set((s) => ({ crtEnabled: !s.crtEnabled })),
      setHydrated: () => set({ hydrated: true }),
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
