import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';

part 'login_input_model.freezed.dart';
part 'login_input_model.g.dart';

@freezed
class LoginInputModel with _$LoginInputModel {
  factory LoginInputModel({
    required String? email,
    required String? password,
  }) = _LoginInputModel;

  factory LoginInputModel.fromJson(Map<String, dynamic> json) =>
      _$LoginInputModelFromJson(json);
}
