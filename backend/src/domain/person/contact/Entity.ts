import { Entity, ManyToOne, Property, type Rel, Unique } from '@mikro-orm/core';
import { Person } from '../Entity';
import { User } from '../user/Entity';

@Entity()
export class Contact extends Person {

  @ManyToOne()
  referal!: Rel<User>;

}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN'
};