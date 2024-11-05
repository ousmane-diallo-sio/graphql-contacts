import 'package:freezed_annotation/freezed_annotation.dart';

part 'address_model.freezed.dart';
part 'address_model.g.dart';

// AddressModel
@freezed
class AddressModel with _$AddressModel {
  const factory AddressModel({
    @JsonKey(name: 'street') required String street,
    @JsonKey(name: 'city') required String city,
    @JsonKey(name: 'zipCode') required String zipCode,
    @JsonKey(name: 'country') required String country,
  }) = _AddressModel;

  factory AddressModel.fromJson(Map<String, dynamic> json) =>
      _$AddressModelFromJson(json);
}
