import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import '../widgets/bottom_navigation_bar.dart';
import '../widgets/user_card.dart';

// Define a StateProvider to manage the active tab index
final selectedIndexProvider = StateProvider<int>((ref) => 0);

class HomeScreen extends ConsumerWidget {
  HomeScreen({super.key});

  final List<String> entries = <String>[
    'Alice', 'Bob', 'Charlie', 'Alice', 'Bob', 'Charlie', 'Alice', 'Bob',
    'Charlie', 'Alice', 'Bob', 'Charlie', 'Alice', 'Bob', 'Charlie', 'Alice',
    'Bob', 'Charlie', 'Alice', 'Bob', 'Charlie'
  ];

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Get the current index from the provider

    return Scaffold(
      appBar: AppBar(
        title: const Text("Liste de contacts"),
      ),
      body: ListView.builder(
        itemCount: entries.length,
        itemBuilder: (BuildContext context, int index) {
          return InkWell(
            onTap: () => print('Clicked on ${entries[index]}'),
            child: UserCard(name: entries[index]),
          );
        },
      ),
      bottomNavigationBar: AppBottomNavigationBar(currentIndex: 0),

      floatingActionButton: FloatingActionButton(
        onPressed: () => context.go('/add-contact'),
        child: const Icon(Icons.add),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }
}
