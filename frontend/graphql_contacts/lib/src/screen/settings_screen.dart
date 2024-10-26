import 'package:flutter/material.dart';
import '../widgets/bottom_navigation_bar.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Paramètres"),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          const SizedBox(height: 16.0),

          ListTile(
            leading: const Icon(Icons.notifications),
            title: const Text("Notifications"),
            subtitle: const Text("Gérer les notifications"),
            trailing: Switch(
              value: true, // Pour activer/désactiver les notifications
              onChanged: (value) {
                // Logique pour activer/désactiver les notifications
              },
            ),
          ),
          const Divider(),

          // Section pour le thème
          ListTile(
            leading: const Icon(Icons.color_lens),
            title: const Text("Thème"),
            subtitle: const Text("Changer le thème de l'application"),
            trailing: const Icon(Icons.arrow_forward_ios),
            onTap: () {
              // Naviguer vers une autre page ou modal pour les options de thème
            },
          ),
          const Divider(),

          // Section pour le compte
          ListTile(
            leading: const Icon(Icons.person),
            title: const Text("Compte"),
            subtitle: const Text("Gérer les informations du compte"),
            trailing: const Icon(Icons.arrow_forward_ios),
            onTap: () {
              // Naviguer vers les paramètres de compte
            },
          ),
          const Divider(),

          // Section pour la langue
          ListTile(
            leading: const Icon(Icons.language),
            title: const Text("Langue"),
            subtitle: const Text("Sélectionner la langue de l'application"),
            trailing: const Icon(Icons.arrow_forward_ios),
            onTap: () {
              // Naviguer vers les paramètres de langue
            },
          ),
          const Divider(),

          // Section pour la sécurité
          ListTile(
            leading: const Icon(Icons.lock),
            title: const Text("Sécurité"),
            subtitle: const Text("Paramètres de sécurité et de confidentialité"),
            trailing: const Icon(Icons.arrow_forward_ios),
            onTap: () {
              // Naviguer vers les paramètres de sécurité
            },
          ),
          const Divider(),

          ListTile(
            leading: const Icon(Icons.exit_to_app),
            title: const Text("Déconnexion"),
            onTap: () {
              // Logique pour la déconnexion
            },
          ),
        ],
      ),
      bottomNavigationBar: AppBottomNavigationBar(currentIndex: 2),
    );
  }
}
