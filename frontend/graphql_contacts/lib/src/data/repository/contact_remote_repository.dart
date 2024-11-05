import 'package:ferry/ferry.dart';
import 'package:graphql_contacts/__generated__/schema.schema.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/create_contact.req.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/read_contacts.req.gql.dart';
import 'package:graphql_contacts/src/domain/user_model.dart';
// import 'package:graphql_contacts/src/data/graphql/__generated__/delete_contact.req.gql.dart';
// import 'package:graphql_contacts/src/data/graphql/__generated__/read_contact.req.gql.dart';
// import 'package:graphql_contacts/src/data/graphql/__generated__/read_contacts.req.gql.dart';
// import 'package:graphql_contacts/src/data/graphql/__generated__/update_contact.req.gql.dart';
import 'package:graphql_contacts/src/exceptions/app_exceptions.dart';
import 'package:graphql_contacts/src/provider/ferry_client.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'contact_remote_repository.g.dart';

@riverpod
ContactRemoteRepository contactRemoteRepository(
  ContactRemoteRepositoryRef ref,
) {
  return ContactRemoteRepository(
    ferryClient: ref.watch(ferryClientProvider).requireValue,
  );
}

class ContactRemoteRepository {
  ContactRemoteRepository({required this.ferryClient});
  final Client ferryClient;

  // Future<ContactModel> getContact({
  //   required String id,
  // }) async {
  //   final request = GContactReq((b) => b..vars.id = id);
  //   final response = await ferryClient.request(request).first;
  //   final data = response.data;
  //   if (response.hasErrors) throw const UnknownException();
  //   if (data == null) throw const DataNotFoundException();
  //   return ContactModel.fromJson(data.contact.toJson());
  // }

  Future<List<UserModel>> getContacts() async {
    try {
      final request = GContactsReq();
      final response = await ferryClient.request(request).first;
      final data = response.data;
      print(response.graphqlErrors);
      print(response.linkException);
      if (response.hasErrors) throw Exception(response.graphqlErrors);
      if (data == null) throw const DataNotFoundException();
      return data.contacts?.map((e) {
            return UserModel.fromJson(e?.toJson() ?? {});
          }).toList() ??
          [];
    } catch (e) {
      rethrow;
    }
  }

  Future<UserModel> createContact({
    required UserModel contact,
  }) async {
    print("INPUT: ${GCreateContactInput.fromJson(contact.toJson())}");
    final request = GCreateContactReq(
      (b) => b
        ..vars.input =
            GCreateContactInput.fromJson(contact.toJson())?.toBuilder(),
    );
    final response = await ferryClient.request(request).first;
    print("ERROR: ${response.graphqlErrors}");
    print("ERROR: ${response.linkException}");
    final data = response.data;
    if (response.hasErrors) throw const UnknownException();
    if (data == null) throw const DataNotFoundException();
    return UserModel.fromJson(data.createContact?.toJson() ?? {});
  }

  // Future<ContactModel> updateContact({
  //   required ContactModel contact,
  // }) async {
  //   final request = GUpdateContactReq(
  //     (b) =>
  //         b..vars.input = GUpdateContactInput.fromJson(contact.toJson())?.toBuilder(),
  //   );
  //   final response = await ferryClient.request(request).first;
  //   final data = response.data;
  //   if (response.hasErrors) throw const UnknownException();
  //   if (data == null) throw const DataNotFoundException();
  //   return ContactModel.fromJson(data.updateContact.toJson());
  // }

  // Future<ContactModel> deleteContact({
  //   required String id,
  // }) async {
  //   final request = GDeleteContactReq((b) => b..vars.id = id);
  //   final response = await ferryClient.request(request).first;
  //   final data = response.data;
  //   if (response.hasErrors) throw const UnknownException();
  //   if (data == null) throw const DataNotFoundException();
  //   return ContactModel.fromJson(data.deleteContact.toJson());
  // }
}
