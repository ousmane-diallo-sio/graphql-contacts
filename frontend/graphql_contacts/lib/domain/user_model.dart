import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:graphql_contacts/domain/gender_model.dart';
import 'package:graphql_contacts/domain/social_networks_model.dart';
import 'address_model.dart';

part 'user_model.freezed.dart';
part 'user_model.g.dart';

@freezed
class UserModel with _$UserModel {
  const factory UserModel({
    @JsonKey(name: 'id') required String id,
    @JsonKey(name: 'email') required String email,
    @JsonKey(name: 'name') required String name,
    @JsonKey(name: 'address') AddressModel? address,
    @JsonKey(name: 'phoneNumber') String? phoneNumber,
    @JsonKey(name: 'gender') required GenderModel gender,
    @JsonKey(name: 'height') double? height,
    @JsonKey(name: 'weight') double? weight,
    @JsonKey(name: 'socialNetworks') SocialNetworksModel? socialNetworks,
  }) = _UserModel;

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);
}
