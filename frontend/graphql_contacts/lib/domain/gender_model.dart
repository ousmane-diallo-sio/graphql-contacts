// ignore_for_file: constant_identifier_names

import 'package:freezed_annotation/freezed_annotation.dart';

enum GenderModel {
  @JsonValue('MALE')
  MALE,
  @JsonValue('FEMALE')
  FEMALE,
  @JsonValue('UNKNOWN')
  UNKNOWN,
}
