import { BeforeCreate, BeforeUpdate, BeforeUpsert, Cascade, Collection, Embedded, Entity, Enum, type EventArgs, OneToMany, Property, Unique } from '@mikro-orm/core';
import jwt from "jsonwebtoken";
import EnvConfig from '../../../lib/config/EnvConfig';
import crypto from "crypto";
import { Address } from '../../address/Entity';
import { SocialNetworks } from '../../social-networks/Entity';
import { Person } from '../Entity';
import { Contact } from '../contact/Entity';

@Entity()
export class User extends Person {

  @Property({ hidden: true, lazy: true })
  password!: string;

  @Property({ hidden: true, lazy: true })
  salt!: string

  @OneToMany(() => Contact, contact => contact.referal, { cascade: [Cascade.ALL], orphanRemoval: true })
  contacts = new Collection<Contact>(this);

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