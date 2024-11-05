import 'package:flutter/material.dart';
import 'package:graphql_contacts/src/data/repository/contact_remote_repository.dart';
import 'package:graphql_contacts/src/domain/user_model.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import '../routing/router.dart';
import '../widgets/bottom_navigation_bar.dart';
import '../widgets/user_card.dart';

final selectedIndexProvider = StateProvider<int>((ref) => 0);

class HomeScreen extends ConsumerWidget {
  HomeScreen({super.key});

  final List<String> user = <String>[
    'Alice',
    'Bob',
    'Charlie',
    'Alice',
    'Bob',
    'Charlie',
    'Alice',
    'Bob',
    'Charlie',
    'Alice',
    'Bob',
    'Charlie',
    'Alice',
    'Bob',
    'Charlie',
    'Alice',
    'Bob',
    'Charlie',
    'Alice',
    'Bob',
    'Charlie'
  ];

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Get the current index from the provider

    return Scaffold(
      appBar: AppBar(
        title: const Text("Liste de contacts"),
      ),
      body: FutureBuilder(
        future: ref.read(contactRemoteRepositoryProvider).getContacts(),
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return Center(
              child: Text(snapshot.error.toString()),
            );
          }
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }
          final users = snapshot.data as List<UserModel>;
          print("USER: $users");

          return ListView.builder(
            itemCount: users.length,
            itemBuilder: (BuildContext context, int index) {
              final user = users[index];
              return InkWell(
                onTap: () => print('Clicked on ${users[index]}'),
                child: UserCard(name: user.name ?? ""),
              );
            },
          );
        },
      ),
      bottomNavigationBar: AppBottomNavigationBar(currentIndex: 0),
      floatingActionButton: FloatingActionButton(
        onPressed: () => const AddContactScreenRoute().go(context),
        child: const Icon(Icons.add),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }
}
