import 'package:envied/envied.dart';

part 'env.g.dart';

@Envied()
abstract class Env {
  @EnviedField(varName: 'GRAPHQL_URL', obfuscate: true)
  static final String graphqlUrl = _Env.graphqlUrl;
}
