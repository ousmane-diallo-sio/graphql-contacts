import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:graphql_contacts/src/provider/flutter_secure_storage.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'local_jwt_data_source.g.dart';

@Riverpod(keepAlive: true)
LocalJwtDataSource localJwtDataSource(LocalJwtDataSourceRef ref) {
  return LocalJwtDataSource(ref.watch(flutterSecureStorageProvider));
}

class LocalJwtDataSource {
  LocalJwtDataSource(this.flutterSecureStorage);

  final FlutterSecureStorage flutterSecureStorage;

  static const _jwtKey = "jwt";

  Future<void> createJwt({required String jwt}) async {
    await flutterSecureStorage.write(key: _jwtKey, value: jwt);
  }

  Future<String?> readJwt() async {
    try {
      return await flutterSecureStorage.read(key: _jwtKey);
    } catch (_) {
      return null;
    }
  }

  Future<void> deleteJwt() async {
    await flutterSecureStorage.delete(key: _jwtKey);
  }
}
