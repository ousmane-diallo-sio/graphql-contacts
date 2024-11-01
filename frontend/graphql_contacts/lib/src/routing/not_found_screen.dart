import 'package:flutter/material.dart';
import 'package:graphql_contacts/src/utils/build_context_extension.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:graphql_contacts/src/routing/router.dart';

class NotFoundScreen extends ConsumerWidget {
  const NotFoundScreen({super.key});

  // Define the gap as a widget with a constant size
  Widget get gap32 => const SizedBox(height: 32);

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
            gap32, // Ensure gap32 returns a SizedBox
            // Use ElevatedButton instead of FilledButton if there is an issue with FilledButton
            ElevatedButton(
              onPressed: () => const HomeScreenRoute().go(context),
              child: const Text("Retourner à l'accueil"),
            ),
          ],
        ),
      ),
    );
  }
}
