import 'package:freezed_annotation/freezed_annotation.dart';

part 'social_networks_model.freezed.dart';
part 'social_networks_model.g.dart';

// SocialNetworksModel
@freezed
class SocialNetworksModel with _$SocialNetworksModel {
  const factory SocialNetworksModel({
    @JsonKey(name: 'facebookUrl') String? facebookUrl,
    @JsonKey(name: 'twitterUrl') String? twitterUrl,
    @JsonKey(name: 'instagramUrl') String? instagramUrl,
    @JsonKey(name: 'linkedinUrl') String? linkedinUrl,
  }) = _SocialNetworksModel;

  factory SocialNetworksModel.fromJson(Map<String, dynamic> json) =>
      _$SocialNetworksModelFromJson(json);
}
