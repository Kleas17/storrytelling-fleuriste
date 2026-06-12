"use client";

import { create } from "zustand";

interface SiteState {
  /** L'intro (loader) est terminée — le hero peut démarrer ses animations. */
  introDone: boolean;
  setIntroDone: (v: boolean) => void;
  /** Menu drawer mobile / fullscreen ouvert. */
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  /** Libellé du curseur custom ("Voir", "Contact"…). */
  cursorLabel: string | null;
  setCursorLabel: (v: string | null) => void;
}

export const useSiteStore = create<SiteState>((set) => ({
  introDone: false,
  setIntroDone: (v) => set({ introDone: v }),
  menuOpen: false,
  setMenuOpen: (v) => set({ menuOpen: v }),
  cursorLabel: null,
  setCursorLabel: (v) => set({ cursorLabel: v }),
}));
