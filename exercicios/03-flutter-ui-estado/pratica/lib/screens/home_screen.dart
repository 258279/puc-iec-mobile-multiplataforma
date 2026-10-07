// lib/screens/home_screen.dart

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../state/favorites.dart';
import '../services/remote_config.dart';
import '../widgets/movie_list.dart';
import '../widgets/offline_banner.dart';
import '../widgets/offline_toggle.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(favoritesProvider).length;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Filmes'),
        actions: [
          OfflineToggle(), // modo avião simulado (pronto)
          IconButton(
            icon: const Icon(Icons.delete_outline),
            onPressed: () => ref.read(favoritesProvider.notifier).clear(),
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 16),
            child: Center(child: Text('♥ $count')),
          ),
        ],
      ),
      body: Column(
        // ignore: prefer_const_literals_to_create_immutables
        children: [
          const OfflineBanner(), // TASK 11 — aviso de offline
          FutureBuilder<String>(
            future: fetchBannerMessage(),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const SizedBox.shrink(); // ou um CircularProgressIndicator pequeno
              } else if (snapshot.hasError) {
                return const SizedBox.shrink(); // ou uma mensagem de erro simples
              } else {
                final message = snapshot.data ?? '';
                return Container(
                  width: double.infinity,
                  color: Colors.blueAccent,
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    message,
                    style: const TextStyle(color: Colors.white),
                    textAlign: TextAlign.center,
                  ),
                );
              }
            },
          ),
          const Expanded(
              child: MovieList()), // lista vinda do repositório (cache-first)
        ],
      ),
    );
  }
}
