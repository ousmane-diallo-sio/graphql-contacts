import 'package:ferry_hive_store/ferry_hive_store.dart';
import 'package:hive_flutter/hive_flutter.dart';

import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'hive_store.g.dart';

@Riverpod(keepAlive: true)
FutureOr<HiveStore> hiveStore(HiveStoreRef ref) async {
  await Hive.initFlutter();
  final box = await Hive.openBox("ferry");
  final store = HiveStore(box);
  return store;
}
