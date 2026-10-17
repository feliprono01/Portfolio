"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { SKINS, type SkinId } from "@/lib/skins";

function applySkin(skin: SkinId) {
  document.documentElement.setAttribute("data-skin", skin);
  const themeColor = SKINS.find((s) => s.id === skin)?.themeColor;
  if (themeColor) {
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColor);
  }
}

/**
 * Rehydrates the persisted store after mount (so SSR and first client render
 * match) and keeps <html data-skin> in sync with the selected skin.
 */
export default function StoreHydrator() {
  useEffect(() => {
    useAppStore.persist.rehydrate();
    applySkin(useAppStore.getState().skin);
    return useAppStore.subscribe((state, prev) => {
      if (state.skin !== prev.skin) applySkin(state.skin);
    });
  }, []);

  return null;
}
