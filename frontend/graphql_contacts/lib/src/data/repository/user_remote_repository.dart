import 'package:ferry/ferry.dart';
import 'package:graphql_contacts/__generated__/schema.schema.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/create_user.data.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/create_user.req.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/create_user.var.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/delete_user.data.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/delete_user.req.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/delete_user.var.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/read_user.data.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/read_user.req.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/read_user.var.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/read_users.data.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/read_users.req.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/read_users.var.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/update_user.data.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/update_user.req.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/update_user.var.gql.dart';
import 'package:graphql_contacts/src/domain/user_model.dart';
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

  Stream<OperationResponse<GUserData, GUserVars>> getUserStream({
    required String id,
  }) {
    final request = GUserReq((b) => b..vars.id = id);
    return ferryClient.request(request);
  }

  Stream<OperationResponse<GUsersData, GUsersVars>> getUsersStream() {
    final request = GUsersReq();
    return ferryClient.request(request);
  }

  Stream<OperationResponse<GCreateUserData, GCreateUserVars>> createUserStream({
    required UserModel user,
  }) {
    final request = GCreateUserReq(
      (b) => b..vars.input = GUserInput.fromJson(user.toJson())?.toBuilder(),
    );
    return ferryClient.request(request);
  }

  Stream<OperationResponse<GUpdateUserData, GUpdateUserVars>> updateUserStream({
    required UserModel user,
  }) {
    final request = GUpdateUserReq(
      (b) =>
          b..vars.input = GUpdateUserInput.fromJson(user.toJson())?.toBuilder(),
    );
    return ferryClient.request(request);
  }

  Stream<OperationResponse<GDeleteUserData, GDeleteUserVars>> deleteUserStream({
    required String id,
  }) {
    final request = GDeleteUserReq((b) => b..vars.id = id);
    return ferryClient.request(request);
  }
}
