import { BeforeCreate, BeforeUpdate, BeforeUpsert, Embedded, Entity, Enum, type EventArgs, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from '../../db/BaseEntity';
import jwt from "jsonwebtoken";
import EnvConfig from '../../lib/config/EnvConfig';
import crypto from "crypto";
import { Address } from '../address/Entity';
import { SocialNetworks } from '../social-networks/Entity';

@Entity()
@Unique({ properties: ['email'] })
export class User extends BaseEntity {

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

  @Property({ hidden: true, lazy: true })
  password!: string;

  @Property({ hidden: true, lazy: true })
  salt!: string;

  @BeforeCreate()
  @BeforeUpdate()
  @BeforeUpsert()
  async hashPassword(args: EventArgs<User>) {
    const password = args.changeSet?.payload.password;
    if (password) {
      const salt = crypto.randomBytes(16).toString('hex');
      this.password = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
      this.salt = salt;
    }
  }

  generateToken() {
    return jwt.sign({ id: this.id, email: this.email }, EnvConfig.JWT_SECRET, { expiresIn: "7d" });
  }

  verifyPassword(password: string) {
    const _hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return _hash === this.password;
  }

}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN'
};