import 'package:ferry/ferry.dart';
import 'package:gql_http_link/gql_http_link.dart';
import 'package:graphql_contacts/env/env.dart';
import 'package:graphql_contacts/src/provider/hive_store.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'ferry_client.g.dart';

@Riverpod(keepAlive: true)
FutureOr<Client> ferryClient(
  FerryClientRef ref,
) async {
  final serverUrl = Env.graphqlUrl;
  final link = HttpLink(serverUrl);
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
