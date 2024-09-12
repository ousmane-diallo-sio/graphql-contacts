import { Embeddable, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../db/BaseEntity';

@Embeddable()
export class Address extends BaseEntity {

  @Property()
  street!: string;

  @Property()
  city!: string;

  @Property()
  country!: string;

  @Property()
  zipCode!: string;

}