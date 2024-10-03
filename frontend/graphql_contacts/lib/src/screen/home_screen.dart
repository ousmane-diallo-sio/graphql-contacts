import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../widgets/user_card.dart';

class HomeScreen extends ConsumerWidget {
  HomeScreen({super.key});

  final List<String> entries = <String>['Alice', 'Bob', 'Charlie'];

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Liste de contacts"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Expanded(
              child: ListView.builder(
                itemCount: entries.length,
                itemBuilder: (BuildContext context, int index) {
                  return UserCard(name: entries[index]);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}