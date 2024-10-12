import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:go_router/go_router.dart';
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

  void _onItemTapped(BuildContext context, WidgetRef ref, int index) {
    // Update the selected index in the provider
    ref.read(selectedIndexProvider.notifier).state = index;

    // Handle navigation based on the selected index
    switch (index) {
      case 0:
        context.go('/contacts');
        break;
      case 1:
        context.go('/profile');
        break;
      case 2:
        context.go('/settings');
        break;
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Get the current index from the provider
    final selectedIndex = ref.watch(selectedIndexProvider);

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
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: selectedIndex, // Set the current index
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.contacts),
            label: 'Contacts',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profil',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: 'Paramètres',
          ),
        ],
        onTap: (index) => _onItemTapped(context, ref, index),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => print('Clicked on add button'),
        child: const Icon(Icons.add),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }
}
