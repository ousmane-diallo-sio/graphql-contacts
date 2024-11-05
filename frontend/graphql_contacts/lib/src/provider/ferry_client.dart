import 'package:ferry/ferry.dart';
import 'package:gql_http_link/gql_http_link.dart';
import 'package:graphql_contacts/env/env.dart';
import 'package:graphql_contacts/src/data/repository/jwt_repository.dart';
import 'package:graphql_contacts/src/provider/hive_store.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'ferry_client.g.dart';

@Riverpod(keepAlive: true)
FutureOr<Client> ferryClient(
  FerryClientRef ref,
) async {
  final jwt = await ref.watch(jwtRepositoryProvider).readJwt();
  final headers = {
    if (jwt != null) "Authorization": "Bearer $jwt",
  };
  final serverUrl = Env.graphqlUrl;
  final link = HttpLink(serverUrl, defaultHeaders: headers);
  final hiveStore = ref.watch(hiveStoreProvider).requireValue;
  final cache = Cache(store: hiveStore);
  return Client(
    link: link,
    cache: cache,
    defaultFetchPolicies: {
      OperationType.query: FetchPolicy.NetworkOnly,
      OperationType.mutation: FetchPolicy.NetworkOnly,
      OperationType.subscription: FetchPolicy.NetworkOnly,
    },
  );
}
