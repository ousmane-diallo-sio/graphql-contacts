import 'package:graphql_contacts/src/routing/router.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:graphql_contacts/src/constants/themes.dart' as themes;

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp.router(
      title: "Graphql Contacts",
      debugShowCheckedModeBanner: false,
      routerConfig: ref.watch(routerProvider),
      theme: themes.lightTheme,
      darkTheme: themes.darkTheme,
      themeMode: ThemeMode.light,
    );
  }
}
