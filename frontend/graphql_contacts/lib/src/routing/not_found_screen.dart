import 'package:flutter/material.dart';
import 'package:graphql_contacts/src/utils/build_context_extension.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:graphql_contacts/src/routing/router.dart';

class NotFoundScreen extends ConsumerWidget {
  const NotFoundScreen({super.key});

  get gap32 => null;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              "Cette page n'existe pas",
              style: context.textTheme.headlineMedium,
              textAlign: TextAlign.center,
            ),
            gap32,
            FilledButton(
              onPressed: () => const HomeScreenRoute().go(context),
              child: const Text("Retourner à l'accueil"),
            ),
          ],
        ),
      ),
    );
  }
}
