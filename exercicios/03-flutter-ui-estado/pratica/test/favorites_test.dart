import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:filmes_flutter/state/favorites.dart';

void main() {
  test('favoritos: toggle e clear', () {
    final c = ProviderContainer(); addTearDown(c.dispose);
    expect(c.read(favoritesProvider), isEmpty);
    c.read(favoritesProvider.notifier).toggle(1);
    expect(c.read(favoritesProvider).contains(1), isTrue);

    // TODO: toggle(1) de novo → NÃO contém mais o 1
    c.read(favoritesProvider.notifier).toggle(1);
    expect(c.read(favoritesProvider).contains(1), isFalse);
    // TODO: clear() → volta a ficar vazio
    c.read(favoritesProvider.notifier).clear();
    expect(c.read(favoritesProvider), isEmpty);
  });
}
