import { Embeddable, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../db/BaseEntity';

@Embeddable()
export class SocialNetworks extends BaseEntity {

  @Property()
  facebookUrl?: string;

  @Property()
  twitterUrl?: string;

  @Property()
  instagramUrl?: string;

  @Property()
  linkedinUrl?: string;

  get hasAnySocialNetwork() {
    return this.facebookUrl || this.twitterUrl || this.instagramUrl || this.linkedinUrl;
  }

}