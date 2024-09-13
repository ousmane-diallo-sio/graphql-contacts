import 'package:ferry/ferry.dart';
import 'package:graphql_contacts/__generated__/schema.schema.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/create_user.req.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/delete_user.req.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/read_user.req.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/read_users.req.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/update_user.req.gql.dart';
import 'package:graphql_contacts/src/domain/user_model.dart';
import 'package:graphql_contacts/src/exceptions/app_exceptions.dart';
import 'package:graphql_contacts/src/provider/ferry_client.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'user_remote_repository.g.dart';

@riverpod
UserRemoteDataSource userRemoteDataSourceProvider(
    UserRemoteDataSourceProviderRef ref) {
  return UserRemoteDataSource(
    ferryClient: ref.watch(ferryClientProvider).requireValue,
  );
}

class UserRemoteDataSource {
  UserRemoteDataSource({
    required this.ferryClient,
  });
  final Client ferryClient;

  Future<UserModel> getUser({
    required String id,
  }) async {
    final request = GUserReq((b) => b..vars.id = id);
    final response = await ferryClient.request(request).first;
    final data = response.data;
    if (response.hasErrors) throw const UnknownException();
    if (data == null) throw const DataNotFoundException();
    return UserModel.fromJson(data.user!.toJson());
  }

  Future<List<UserModel>> getUsers() async {
    final request = GUsersReq();
    final response = await ferryClient.request(request).first;
    final data = response.data;
    if (response.hasErrors) throw const UnknownException();
    if (data == null) throw const DataNotFoundException();
    return [
      ...?data.users?.nonNulls.map((e) {
        return UserModel.fromJson(e.toJson());
      })
    ];
  }

  Future<UserModel> createUser({
    required UserModel user,
  }) async {
    final request = GCreateUserReq(
      (b) => b..vars.input = GUserInput.fromJson(user.toJson())?.toBuilder(),
    );
    final response = await ferryClient.request(request).first;
    final data = response.data;
    if (response.hasErrors) throw const UnknownException();
    if (data == null) throw const DataNotFoundException();
    return UserModel.fromJson(data.createUser.toJson());
  }

  Future<UserModel> updateUser({
    required UserModel user,
  }) async {
    final request = GUpdateUserReq(
      (b) =>
          b..vars.input = GUpdateUserInput.fromJson(user.toJson())?.toBuilder(),
    );
    final response = await ferryClient.request(request).first;
    final data = response.data;
    if (response.hasErrors) throw const UnknownException();
    if (data == null) throw const DataNotFoundException();
    return UserModel.fromJson(data.updateUser.toJson());
  }

  Future<UserModel> deleteUser({
    required String id,
  }) async {
    final request = GDeleteUserReq((b) => b..vars.id = id);
    final response = await ferryClient.request(request).first;
    final data = response.data;
    if (response.hasErrors) throw const UnknownException();
    if (data == null) throw const DataNotFoundException();
    return UserModel.fromJson(data.deleteUser.toJson());
  }
}
