import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:graphql_contacts/src/app.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:url_strategy/url_strategy.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  setPathUrlStrategy();
  SystemChrome.setEnabledSystemUIMode(
    SystemUiMode.manual,
    overlays: [],
  );
  runApp(
    const ProviderScope(
      child: App(),
    ),
  );
}
