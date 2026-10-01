// src/store/favoritesStore.ts
//
// ATIVIDADE 2 — TASK 5 (Zustand favorites) + TASK 7 (persist manual + MMKV)
//
// Doc: https://github.com/pmndrs/zustand

import { create } from 'zustand';
import { mmkvStorage } from '@/storage/mmkv';

type FavoritesState = {
  ids: number[];
  toggle: (id: number) => void;
  isFavorite: (id: number) => boolean;
  add: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
};

const STORAGE_KEY = 'favorites-ids';
const loadInitial = (): number[] => {
  try {
    const raw = mmkvStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

// envolver create com persist ({name, storage})
export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  ids: loadInitial(), 
  toggle: (id) => {
    const ids = get().ids;
    if (ids.includes(id)) {
      set({ ids: ids.filter((i) => i !== id) });
    } else {
      set({ ids: [...ids, id] });
    }
  },
  isFavorite: (id) => get().ids.includes(id),
  add: (id) => {
    const ids = get().ids;
    if (!ids.includes(id)) {
      set({ ids: [...ids, id] });
    }
  },
  remove: (id) => {
    const ids = get().ids;
    set({ ids: ids.filter((i) => i !== id) });
  },
  clear: () => {
    set({ ids: [] });
  }
}));

useFavoritesStore.subscribe((state) => {
  try {
    mmkvStorage.setItem('favorites-ids', JSON.stringify(state.ids));
  } catch {}
});

// Por que persist manual em vez de middleware?
// Zustand devtools middleware usa import.meta.env (Vite-style) que quebra
// no Metro web bundler. Persist via subscribe evita o problema e é cleaner
// pedagogicamente — você vê exatamente quando o save acontece.
