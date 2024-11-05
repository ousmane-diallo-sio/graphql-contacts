import { Contact } from './Entity';
import { orm } from '../../..';
import { NotFoundError } from '../../../exceptions/GraphQLContactError';
import { FindAllOptions, FindOneOrFailOptions, rel, sql, wrap } from '@mikro-orm/core';
import { CreateContactDTO } from '.';
import { User } from '../user/Entity';
import { Address } from '../../address/Entity';
import { SocialNetworks } from '../../social-networks/Entity';
import { omit } from '../../../lib/utils';
import { BaseEntity } from '../../../BaseEntity';

class ContactRepository {

  async create(userId: string, data: CreateContactDTO): Promise<Contact | null> {
    const em = orm.em.fork();

    const referal = await em.findOneOrFail(User, { id: userId }, { 
      failHandler: () => new NotFoundError("Contact referal not found"),
    });
    
    console.debug('referal', referal.id);

    const contact = em.create(Contact, {
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      height: data.height,
      weight: data.weight,
      address: data.address ? (
        new Address(data.address.street, data.address.city, data.address.country, data.address.zipCode)
       ) : undefined,
      socialNetworks: data.socialNetworks ? (
        new SocialNetworks(data.socialNetworks.facebookUrl, data.socialNetworks.twitterUrl, data.socialNetworks.instagramUrl, data.socialNetworks.linkedinUrl)
       ) : undefined,
      referal: referal.id
    });

    await em.flush();

    console.debug('contact', contact);

    return contact;
  }

  async update(id: string, data: any): Promise<Contact> {
    const em = orm.em.fork();
    const contact = await em.findOneOrFail(Contact, {id: id}, { 
      failHandler: () => new NotFoundError() }
    );
    
    wrap(contact).assign(data, { mergeObjectProperties: true });
    await em.persistAndFlush(contact);
    return contact;
  }

  async delete(id: string) {
    const em = orm.em.fork();
    console.debug('deleting contact', id);
    return await em.nativeDelete(Contact, { id });
  }

  async findAll(options?: FindAllOptions<Contact, never, "*", never> | undefined) {
    const em = orm.em.fork();
    return await em.findAll(Contact, options);
  }

  async findById(id: string, options?: FindOneOrFailOptions<Contact, never, "*", never> | undefined) {
    const em = orm.em.fork();
    return await em.findOneOrFail(Contact, { id: id }, {
      ...options,
      failHandler: () => new NotFoundError(),
    }
    );
  }
}

export const contactRepository = new ContactRepository();