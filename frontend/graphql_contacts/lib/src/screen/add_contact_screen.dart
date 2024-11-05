import 'package:flutter/material.dart';
import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:graphql_contacts/src/routing/router.dart';

class AddContactScreen extends StatefulWidget {
  const AddContactScreen({super.key});

  @override
  _AddContactScreenState createState() => _AddContactScreenState();
}

class _AddContactScreenState extends State<AddContactScreen> {
  // TextEditingControllers
  final TextEditingController nameController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController streetController = TextEditingController();
  final TextEditingController cityController = TextEditingController();
  final TextEditingController zipController = TextEditingController();
  final TextEditingController countryController = TextEditingController();
  final TextEditingController heightController = TextEditingController();
  final TextEditingController weightController = TextEditingController();
  final TextEditingController facebookController = TextEditingController();
  final TextEditingController twitterController = TextEditingController();
  final TextEditingController instagramController = TextEditingController();
  final TextEditingController linkedinController = TextEditingController();

  // Dropdown selection states
  String selectedGender = 'MALE';
  String selectedPhoneType = 'Mobile';

  // Form submission function
  void submitForm() {
    if (nameController.text.isEmpty ||
        phoneController.text.isEmpty ||
        !emailController.text.contains('@') ||
        streetController.text.isEmpty ||
        cityController.text.isEmpty ||
        zipController.text.isEmpty ||
        countryController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('Veuillez remplir correctement tous les champs')),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Contact ajouté avec succès!')),
      );
      const HomeScreenRoute().go(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Ajouter un contact"),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            const HomeScreenRoute().go(context);
          },
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 24.0),

              // Section: Informations Personnelles
              _buildTextField(nameController, 'Nom', Icons.person),
              const SizedBox(height: 16.0),
              DropdownButtonFormField<String>(
                value: selectedGender,
                decoration: const InputDecoration(
                  labelText: 'Genre',
                  border: OutlineInputBorder(),
                ),
                items: ['MALE', 'FEMALE', 'UNKNOWN']
                    .map((gender) =>
                        DropdownMenuItem(value: gender, child: Text(gender)))
                    .toList(),
                onChanged: (value) {
                  setState(() {
                    selectedGender = value!;
                  });
                },
              ),
              const SizedBox(height: 16.0),

              // Section: Coordonnées de Contact
              Row(
                children: [
                  Expanded(
                    flex: 1,
                    child: DropdownButtonFormField<String>(
                      value: selectedPhoneType,
                      decoration: const InputDecoration(
                        labelText: 'Type',
                        border: OutlineInputBorder(),
                      ),
                      items: ['Mobile', 'Fixe', 'Autre']
                          .map((type) =>
                              DropdownMenuItem(value: type, child: Text(type)))
                          .toList(),
                      onChanged: (value) {
                        setState(() {
                          selectedPhoneType = value!;
                        });
                      },
                    ),
                  ),
                  const SizedBox(width: 8.0),
                  Expanded(
                    flex: 2,
                    child: TextField(
                      controller: phoneController,
                      keyboardType: TextInputType.phone,
                      decoration: const InputDecoration(
                        labelText: 'Numéro de téléphone',
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16.0),
              _buildTextField(emailController, 'Email', Icons.email,
                  inputType: TextInputType.emailAddress),
              const SizedBox(height: 16.0),

              // Section: Adresse
              _buildTextField(streetController, 'Rue', Icons.location_on),
              const SizedBox(height: 16.0),
              _buildTextField(cityController, 'Ville', Icons.location_city),
              const SizedBox(height: 16.0),
              _buildTextField(
                  zipController, 'Code postal', Icons.local_post_office),
              const SizedBox(height: 16.0),
              _buildTextField(countryController, 'Pays', Icons.public),
              const SizedBox(height: 16.0),

              // Section: Attributs Physiques
              _buildTextField(heightController, 'Taille (en cm)', Icons.height,
                  inputType: TextInputType.number),
              const SizedBox(height: 16.0),
              _buildTextField(
                  weightController, 'Poids (en kg)', Icons.fitness_center,
                  inputType: TextInputType.number),
              const SizedBox(height: 16.0),

              // Section: Réseaux Sociaux
              _buildTextField(
                  facebookController, 'Facebook URL', Icons.facebook),
              const SizedBox(height: 16.0),
              _buildTextField(
                  twitterController, 'Twitter URL', Icons.add_card_rounded),
              const SizedBox(height: 16.0),
              _buildTextField(
                  instagramController, 'Instagram URL', Icons.camera_alt),
              const SizedBox(height: 16.0),
              _buildTextField(
                  linkedinController, 'LinkedIn URL', Icons.business),
              const SizedBox(height: 24.0),

              // Submit Button
              ElevatedButton.icon(
                onPressed: submitForm,
                icon: const Icon(Icons.save),
                label: const Text("Ajouter le contact"),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 24.0, vertical: 12.0),
                  textStyle: const TextStyle(fontSize: 16.0),
                ),
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
}
