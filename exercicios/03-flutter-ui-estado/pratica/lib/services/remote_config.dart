// lib/services/remote_config.dart

import 'package:firebase_remote_config/firebase_remote_config.dart';

const _defaultBannerMessage = 'Bem-vindo ao app de filmes!';

Future<String> fetchBannerMessage() async {
  final remoteConfig = FirebaseRemoteConfig.instance;
  await remoteConfig.setConfigSettings(RemoteConfigSettings(
    fetchTimeout: const Duration(seconds: 10),
    minimumFetchInterval:
        Duration.zero, // sem cache — sempre busca de novo (didático)
  ));
  remoteConfig.setDefaults({'banner_message': _defaultBannerMessage});
  await remoteConfig.fetchAndActivate();
  return remoteConfig.getString('banner_message');
}
