import 'package:flutter/material.dart';

class UserCard extends StatelessWidget {
  final String name;

  const UserCard({required this.name, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: const CircleAvatar(
          child: Icon(
            Icons.person
          ),
        ),
        title: Text(name),
      ),
    );
  }
}