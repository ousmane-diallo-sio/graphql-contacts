import 'package:ferry/ferry.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/read_user.data.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/read_user.req.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/read_user.var.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/read_users.data.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/read_users.req.gql.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/read_users.var.gql.dart';
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

  Stream<OperationResponse<GUsersData, GUsersVars>> getUsersStream({
    required int limit,
    required int offset,
  }) {
    final request = GUsersReq(
      (b) => b
        ..vars.limit = limit
        ..vars.offset = offset,
    );
    return ferryClient.request(request);
  }

  // Stream<OperationResponse<GUserCreateData, GUserCreateVars>> createUserStream({
  //   required UserInput input,
  // }) {
  //   final request = GCreateUserReq((b) => b..vars.input = input.toJson());
  //   return ferryClient.request(request);
  // }

  // Stream<OperationResponse<GUserUpdateData, GUserUpdateVars>> updateUserStream({
  //   required String id,
  //   required UpdateUserInput input,
  // }) {
  //   final request = GUpdateUserReq((b) {
  //     b
  //       ..vars.id = id
  //       ..vars.input = input.toJson();
  //   });
  //   return ferryClient.request(request);
  // }

  // Stream<OperationResponse<GUserDeleteData, GUserDeleteVars>> deleteUserStream({
  //   required String id,
  // }) {
  //   final request = GDeleteUserReq((b) => b..vars.id = id);
  //   return ferryClient.request(request);
  // }
}
