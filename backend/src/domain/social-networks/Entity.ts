import { Embeddable, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../db/BaseEntity';

@Embeddable()
export class SocialNetworks extends BaseEntity {

  constructor(facebookUrl?: string, twitterUrl?: string, instagramUrl?: string, linkedinUrl?: string) {
    super();
    this.facebookUrl = facebookUrl;
    this.twitterUrl = twitterUrl;
    this.instagramUrl = instagramUrl;
    this.linkedinUrl = linkedinUrl;
  }

  @Property()
  facebookUrl?: string;

  @Property()
  twitterUrl?: string;

  @Property()
  instagramUrl?: string;

  @Property()
  linkedinUrl?: string;

}