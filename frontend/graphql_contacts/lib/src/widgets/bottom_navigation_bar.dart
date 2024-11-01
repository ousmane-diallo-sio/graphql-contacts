import 'package:flutter/material.dart';
import 'package:graphql_contacts/src/routing/router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../screen/home_screen.dart';

class AppBottomNavigationBar extends ConsumerWidget {
  final int currentIndex;

  AppBottomNavigationBar({required this.currentIndex});

  void _onItemTapped(BuildContext context, WidgetRef ref, int index) {
    ref.read(selectedIndexProvider.notifier).state = index;

    switch (index) {
      case 0:
        const HomeScreenRoute().go(context);
        break;
      case 1:
        const ProfileScreenRoute().go(context);
        break;
      case 2:
        const SettingsScreenRoute().go(context);
        break;
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return BottomNavigationBar(
      currentIndex: currentIndex,
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
    );
  }
}
