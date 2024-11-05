import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:graphql_contacts/src/domain/gender_model.dart';
import 'package:graphql_contacts/src/domain/social_networks_model.dart';
import 'address_model.dart';

part 'user_model.freezed.dart';
part 'user_model.g.dart';

@freezed
class UserModel with _$UserModel {
  const factory UserModel({
    @JsonKey(name: 'id') String? id,
    @JsonKey(name: 'email') String? email,
    @JsonKey(name: 'password') String? password,
    @JsonKey(name: 'name') String? name,
    @JsonKey(name: 'address') AddressModel? address,
    @JsonKey(name: 'phoneNumber') String? phoneNumber,
    @JsonKey(name: 'gender') GenderModel? gender,
    @JsonKey(name: 'height') double? height,
    @JsonKey(name: 'weight') double? weight,
    @JsonKey(name: 'socialNetworks') SocialNetworksModel? socialNetworks,
  }) = _UserModel;

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);
}
