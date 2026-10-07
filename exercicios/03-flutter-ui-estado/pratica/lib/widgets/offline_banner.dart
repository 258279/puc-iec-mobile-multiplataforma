// lib/widgets/offline_banner.dart

// O teste está em test/offline_test.dart (NÃO edite).
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../state/network.dart';

class OfflineBanner extends ConsumerWidget {
  const OfflineBanner({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final online = ref.watch(onlineProvider);
    if (online) {
      return const SizedBox.shrink();
    }
    return Container(
      color: Colors.red,
      child: const Padding(
        padding: EdgeInsets.all(8.0),
        child: Text(
          'Você está offline — mostrando dados salvos',
          style: TextStyle(color: Colors.white),
        ),
      ),
    );
  }
}
