import 'package:flutter/material.dart';
import 'package:graphql_contacts/src/data/repository/auth_repository.dart';
import 'package:graphql_contacts/src/data/repository/user_remote_repository.dart';
import 'package:graphql_contacts/src/domain/address_model.dart';
import 'package:graphql_contacts/src/domain/gender_model.dart';
import 'package:graphql_contacts/src/domain/login_input_model.dart';
import 'package:graphql_contacts/src/domain/social_networks_model.dart';
import 'package:graphql_contacts/src/domain/user_model.dart';
import 'package:graphql_contacts/src/routing/router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class RegisterScreen extends ConsumerStatefulWidget {
  const RegisterScreen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends ConsumerState<RegisterScreen> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController =
      TextEditingController();

  bool isPasswordVisible = false;

  Future<void> submitForm(BuildContext context) async {
    if (nameController.text.isEmpty ||
        emailController.text.isEmpty ||
        passwordController.text.isEmpty ||
        confirmPasswordController.text.isEmpty ||
        passwordController.text != confirmPasswordController.text) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('Veuillez remplir tous les champs correctement')),
      );
    } else {
      try {
        await _onRegisterButtonPressed(
          context,
          ref,
          user: UserModel(
            email: emailController.text,
            password: passwordController.text,
            name: nameController.text,
          ),
        );
        if (!context.mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Inscription réussie !')),
        );
      } catch (e) {
        if (!context.mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("Échec de l'inscription"),
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Inscription"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 24.0),
              _buildTextField(nameController, 'Nom', Icons.person),
              const SizedBox(height: 16.0),
              _buildTextField(emailController, 'Email', Icons.email,
                  inputType: TextInputType.emailAddress),
              const SizedBox(height: 16.0),
              _buildPasswordField(
                  passwordController, 'Mot de passe', Icons.lock),
              const SizedBox(height: 16.0),
              _buildPasswordField(confirmPasswordController,
                  'Confirmer le mot de passe', Icons.lock_outline),
              const SizedBox(height: 24.0),
              ElevatedButton.icon(
                onPressed: () async => await submitForm(context),
                icon: const Icon(Icons.check_circle),
                label: const Text("S'inscrire"),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 24.0, vertical: 12.0),
                  textStyle: const TextStyle(fontSize: 16.0),
                ),
              ),
              const SizedBox(height: 16.0),
              TextButton(
                onPressed: () {
                  const ConnexionScreenRoute().go(context);
                },
                child: const Text('Déjà un compte ? Connectez-vous'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTextField(
      TextEditingController controller, String labelText, IconData icon,
      {TextInputType inputType = TextInputType.text}) {
    return TextField(
      controller: controller,
      keyboardType: inputType,
      decoration: InputDecoration(
        labelText: labelText,
        border: const OutlineInputBorder(),
        prefixIcon: Icon(icon),
      ),
    );
  }

  Widget _buildPasswordField(
      TextEditingController controller, String labelText, IconData icon) {
    return TextField(
      controller: controller,
      obscureText: !isPasswordVisible,
      decoration: InputDecoration(
        labelText: labelText,
        border: const OutlineInputBorder(),
        prefixIcon: Icon(icon),
        suffixIcon: IconButton(
          icon:
              Icon(isPasswordVisible ? Icons.visibility : Icons.visibility_off),
          onPressed: () {
            setState(() {
              isPasswordVisible = !isPasswordVisible;
            });
          },
        ),
      ),
    );
  }

  Future<void> _onRegisterButtonPressed(
    BuildContext context,
    WidgetRef ref, {
    required UserModel user,
  }) async {
    final user = UserModel(
      id: "0",
      email: emailController.text,
      password: passwordController.text,
      name: nameController.text,
      gender: GenderModel.MALE,
      address: const AddressModel(
        street: "56 boulevard de Pesaro",
        city: "Nanterre",
        zipCode: "93100",
        country: "Nanterre",
      ),
      height: 2,
      phoneNumber: "0",
      socialNetworks:
          const SocialNetworksModel(facebookUrl: "https://facebook.com"),
      weight: 2,
    );
    try {
      await ref.read(userRemoteRepositoryProvider).createUser(user: user);
      // final userId = user.id;
      // if (userId == null) throw Exception("No user");
      // await ref.read(userProvider(id: userId).future);
      if (!context.mounted) return;
      const HomeScreenRoute().go(context);
    } catch (e, s) {
      print((e, s));
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
