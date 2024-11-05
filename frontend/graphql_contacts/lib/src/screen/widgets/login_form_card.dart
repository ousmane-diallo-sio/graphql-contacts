import 'package:flutter/material.dart';
import 'package:graphql_contacts/src/screen/widgets/password_text_field.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class MyLoginFormCard extends ConsumerWidget {
  const MyLoginFormCard({
    super.key,
    required this.emailController,
    required this.passwordController,
  });

  final TextEditingController emailController;
  final TextEditingController passwordController;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Card(
      elevation: 5,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(15, 20, 15, 20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(
              controller: emailController,
              decoration: const InputDecoration(
                hintText: "Email",
                prefixIcon: Icon(Icons.email),
              ),
            ),
            const SizedBox(height: 20),
            PasswordTextField(
              controller: passwordController,
            ),
          ],
        ),
      ),
    );
  }
}
