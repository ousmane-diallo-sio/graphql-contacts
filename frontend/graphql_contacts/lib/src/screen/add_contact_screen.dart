import 'package:flutter/material.dart';
import 'package:graphql_contacts/src/routing/router.dart';

class AddContactScreen extends StatelessWidget {
  const AddContactScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Add Contact"),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
           const HomeScreenRoute().go(context);
          },
        ),
      ),
      body: const Center(
        child: Text(
          "Add Contact Screen",
          style: TextStyle(
            fontSize: 24,
          ),
        ),
      ),
    );
  }
}
