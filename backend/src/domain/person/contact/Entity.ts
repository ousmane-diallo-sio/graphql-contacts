import { BeforeCreate, BeforeUpdate, BeforeUpsert, Embedded, Entity, Enum, type EventArgs, Property, Rel, Unique } from '@mikro-orm/core';
import { BaseEntity } from '../../../db/BaseEntity';
import jwt from "jsonwebtoken";
import EnvConfig from '../../../lib/config/EnvConfig';
import crypto from "crypto";
import { Address } from '../../address/Entity';
import { SocialNetworks } from '../../social-networks/Entity';
import { Person } from '../Entity';
import { User } from '../user/Entity';

@Entity()
@Unique({ properties: ['email'] })
export class Contact extends Person {

  referal!: Rel<User>;

}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN'
};