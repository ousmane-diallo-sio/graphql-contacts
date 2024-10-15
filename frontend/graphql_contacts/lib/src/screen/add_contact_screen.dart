import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

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
            context.go("/home"); // TODO: use Pop
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
