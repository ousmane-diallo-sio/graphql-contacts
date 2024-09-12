import 'package:ferry/ferry.dart';
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

  Stream<OperationResponse<GUserData, GUserVars>> userStream({
    required String id,
  }) {
    final request = GUserReq((b) => b..vars.id = id);
    return ferryClient.request(request);
  }

  Stream<OperationResponse<GUsersData, GUsersVars>> categoriesStream() {
    final request = GUsersReq();
    return ferryClient.request(request);
  }

  Stream<OperationResponse<GUsersDetailsData, GUsersDetailsVars>>
      categoriesDetailsStream() {
    final request = GUsersDetailsReq();
    return ferryClient.request(request);
  }
}
