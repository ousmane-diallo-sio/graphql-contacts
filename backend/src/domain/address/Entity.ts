import { Embeddable, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../db/BaseEntity';

@Embeddable()
export class Address extends BaseEntity {

  constructor(street: string, city: string, country: string, zipCode: string) {
    super();
    this.street = street;
    this.city = city;
    this.country = country;
    this.zipCode = zipCode;
  }

  @Property()
  street!: string;

  @Property()
  city!: string;

  @Property()
  country!: string;

  @Property()
  zipCode!: string;

}