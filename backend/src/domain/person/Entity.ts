import { Embedded, Entity, Enum, Property, Unique } from '@mikro-orm/core';

import { Address } from '../address/Entity';
import { SocialNetworks } from '../social-networks/Entity';
import { BaseEntity } from '../../BaseEntity';

@Entity()
export class Person extends BaseEntity {

  @Property({ unique: true })
  email!: string;

  @Property()
  name!: string;

  @Embedded()
  address?: Address;

  @Property()
  phoneNumber?: string;

  @Enum()
  gender!: GenderEnum;

  @Property()
  height?: number;

  @Property()
  weight?: number;

  @Embedded()
  socialNetworks?: SocialNetworks;

}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN'
};