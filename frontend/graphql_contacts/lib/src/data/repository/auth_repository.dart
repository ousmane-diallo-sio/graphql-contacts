import 'package:ferry/ferry.dart';
import 'package:graphql_contacts/src/data/graphql/__generated__/login.req.gql.dart';
import 'package:graphql_contacts/src/data/repository/jwt_repository.dart';
import 'package:graphql_contacts/src/domain/login_input_model.dart';
import 'package:graphql_contacts/src/domain/user_model.dart';
import 'package:graphql_contacts/src/provider/ferry_client.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'auth_repository.g.dart';

@Riverpod(keepAlive: true)
AuthRepository authRepository(AuthRepositoryRef ref) {
  return AuthRepository(
    ref,
    ferryClient: ref.watch(ferryClientProvider).requireValue,
    jwtRepository: ref.watch(jwtRepositoryProvider),
  );
}

class AuthRepository {
  AuthRepository(
    this.ref, {
    required this.ferryClient,
    required this.jwtRepository,
  });

  final Ref ref;
  final Client ferryClient;
  final JwtRepository jwtRepository;

  Future<void> signIn({required LoginInputModel loginInput}) async {
    final request = GLoginReq(
      (b) => b
        ..vars.email = loginInput.email
        ..vars.password = loginInput.password,
    );
    final response = await ferryClient.request(request).first;
    final data = response.data;
    final jwt = data?.login;
    if (jwt == null) throw Exception("Identifiants incorrectes");
    await jwtRepository.createJwt(jwt);
    ref.invalidateSelf();
  }

  Future<void> signOut() async {
    await Future.wait([
      jwtRepository.deleteJwt(),
    ]);
    ref.invalidateSelf();
  }
}
