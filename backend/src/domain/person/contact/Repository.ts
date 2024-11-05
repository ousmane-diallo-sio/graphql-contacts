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
import { v4 as uuidv4 } from 'uuid';

class ContactRepository {

  async create(userId: string, data: CreateContactDTO): Promise<any> {
    const em = orm.em.fork();

    const referal = await em.findOneOrFail(User, { id: userId }, { 
      failHandler: () => new NotFoundError("Contact referal not found"),
    });
    
    console.debug('referal', referal.id);

    const contactId = uuidv4();
    const addressId = data.address ? uuidv4() : null;
    const socialNetworksId = data.socialNetworks ? uuidv4() : null;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const sql = `
      INSERT INTO "contact" (
        "id", "created_at", "updated_at", "email", "name", "address_id", 
        "address_created_at", "address_updated_at", "address_street", 
        "address_city", "address_country", "address_zip_code", "phone_number", 
        "gender", "height", "weight", "social_networks_id", 
        "social_networks_created_at", "social_networks_updated_at", 
        "social_networks_twitter_url", "referal_id"
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      );
    `;

    const params = [
      contactId, createdAt, updatedAt, data.email, data.name, addressId, 
      createdAt, updatedAt, data.address?.street, data.address?.city, 
      data.address?.country, data.address?.zipCode, data.phoneNumber, 
      data.gender, data.height, data.weight, socialNetworksId, createdAt, 
      updatedAt, data.socialNetworks?.twitterUrl, referal.id
    ];

    await em.getConnection().execute(sql, params);
    const contact = await em.findOneOrFail(Contact, { id: contactId });
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

  async delete(userId: string, id: string) {
    const em = orm.em.fork();
    console.debug(`deleting contact ${id} where referal is`, userId);
    return await em.nativeDelete(Contact, { id, referal: userId });
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