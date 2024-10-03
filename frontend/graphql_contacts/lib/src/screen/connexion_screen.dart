import 'package:flutter/material.dart';

class ConnexionScreen extends StatelessWidget {
  const ConnexionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Connexion'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // email field
            const TextField(
              keyboardType: TextInputType.emailAddress,
              decoration: InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16.0),

            // pwd field
            const TextField(
              obscureText: true,
              decoration: InputDecoration(
                labelText: 'Mot de passe',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16.0),

            //  sign in btn
            ElevatedButton(
              onPressed: () {
                // TODO: Action de connexion à définir
              },
              child: const Text('Connexion'),
            ),

            const SizedBox(height: 8.0),

            // sign up link
            TextButton(
              onPressed: () {
                // TODO: Action pour créer un compte à définir
              },
              child: const Text("Créer un compte"),
            ),

            const SizedBox(height: 16.0),

            // forgot pwd link
            TextButton(
              onPressed: () {
                // TODO: Action pour récupérer le mot de passe à définir
              },
              child: const Text(
                "Mot de passe oublié ?",
                style: TextStyle(color: Colors.blue),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
