import 'package:envied/envied.dart';

part 'env.g.dart';

@Envied(path: "./.env")
abstract class Env {
  @EnviedField(varName: 'GRAPHQL_URL', obfuscate: true)
  static final String graphqlUrl = _Env.graphqlUrl;
}
