// __tests__/favoritesStore.test.ts
//
// ATIVIDADE 2 — testar useFavoritesStore.

import { useFavoritesStore } from '../src/store/favoritesStore';

describe('favoritesStore', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ ids: [] });
  });

  test('toggle adiciona id se não existe', () => {
    const { toggle, ids } = useFavoritesStore.getState();
    
    toggle(1);
    expect(useFavoritesStore.getState().ids).toContain(1);
    
    toggle(2);
    expect(useFavoritesStore.getState().ids).toContain(2);
    expect(useFavoritesStore.getState().ids).toHaveLength(2);
  });

  test('toggle remove id se existe', () => {
    const { toggle } = useFavoritesStore.getState();
    
    toggle(1);
    toggle(2);
    expect(useFavoritesStore.getState().ids).toHaveLength(2);
    
    toggle(1);
    expect(useFavoritesStore.getState().ids).not.toContain(1);
    expect(useFavoritesStore.getState().ids).toContain(2);
    expect(useFavoritesStore.getState().ids).toHaveLength(1);
  });

  test('isFavorite retorna true após add', () => {
    const { add, isFavorite } = useFavoritesStore.getState();
    
    expect(isFavorite(1)).toBe(false);
    
    add(1);
    expect(isFavorite(1)).toBe(true);
    
    add(2);
    expect(isFavorite(2)).toBe(true);
    expect(isFavorite(1)).toBe(true);
  });

  test('clear esvazia ids', () => {
    const { add, clear } = useFavoritesStore.getState();
    
    add(1);
    add(2);
    add(3);
    expect(useFavoritesStore.getState().ids).toHaveLength(3);
    
    clear();
    expect(useFavoritesStore.getState().ids).toHaveLength(0);
  });
});
