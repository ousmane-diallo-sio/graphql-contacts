import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:graphql_contacts/src/data/repository/auth_repository.dart';
import 'package:graphql_contacts/src/domain/login_input_model.dart';
import 'package:graphql_contacts/src/routing/router.dart';
import 'package:graphql_contacts/src/screen/widgets/login_form_card.dart';
import 'package:graphql_contacts/src/utils/build_context_extension.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class ConnexionScreen extends HookConsumerWidget {
  const ConnexionScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final emailController = useTextEditingController();
    final passwordController = useTextEditingController();

    return Scaffold(
      body: LayoutBuilder(
        builder: (context, boxConstraints) {
          return SingleChildScrollView(
            child: ConstrainedBox(
              constraints: BoxConstraints(
                minHeight: boxConstraints.maxHeight,
              ),
              child: Center(
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    vertical: 80,
                    horizontal: 16,
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Text(
                        "Graphql Contacts",
                        style: context.textTheme.displayMedium,
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 100),
                      SizedBox(
                        width: 400,
                        child: MyLoginFormCard(
                          emailController: emailController,
                          passwordController: passwordController,
                        ),
                      ),
                      const SizedBox(height: 48),
                      FilledButton(
                        onPressed: () => _onSignInButtonPressed(
                          context,
                          ref,
                          emailController: emailController,
                          passwordController: passwordController,
                        ),
                        child: const Text("Sign in"),
                      ),
                      const SizedBox(height: 24),
                      TextButton(
                        onPressed: () {
                          const RegisterScreenRoute().go(context);
                        },
                        child: const Text("Sign up"),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Future<void> _onSignInButtonPressed(
    BuildContext context,
    WidgetRef ref, {
    required TextEditingController emailController,
    required TextEditingController passwordController,
  }) async {
    final loginInput = LoginInputModel(
      email: emailController.text,
      password: passwordController.text,
    );
    try {
      await ref.read(authRepositoryProvider).signIn(loginInput: loginInput);
      // final userId = user.id;
      // if (userId == null) throw Exception("No user");
      // await ref.read(userProvider(id: userId).future);
      if (!context.mounted) return;
      const HomeScreenRoute().go(context);
    } catch (e) {
      if (!context.mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          showCloseIcon: true,
          content: Text(e.toString()),
        ),
      );
    }
  }
}
