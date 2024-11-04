import { Contact } from './Entity';
import { orm } from '../../..';
import { NotFoundError } from '../../../exceptions/GraphQLContactError';
import { FindAllOptions, FindOneOrFailOptions, wrap } from '@mikro-orm/core';
import { User } from '../user/Entity';

class ContactRepository {

  async create(data: any): Promise<Contact> {
    const em = orm.em.fork();
    const contact = new Contact();
    contact.email = data.email;
    contact.name = data.name;
    contact.phoneNumber = data.phoneNumber;
    contact.gender = data.gender;
    contact.height = data.height;
    contact.weight = data.weight;
    contact.referal = data.referal;

    await em.persistAndFlush(contact);
    return contact;
  }

  async update(id: string, data: any): Promise<Contact> {
    const em = orm.em.fork();
    const contact = await em.findOneOrFail(Contact, id, { 
      failHandler: () => new NotFoundError() }
    );
    
    wrap(contact).assign(data, { mergeObjectProperties: true });
    await em.persistAndFlush(contact);
    return contact;
  }

  async delete(id: string) {
    const em = orm.em.fork();
    const contactRef = em.getReference(Contact, id);
    return await em.removeAndFlush(contactRef);
  }

  async findAll(options?: FindAllOptions<User, never, "*", never> | undefined) {
    const em = orm.em.fork();
    return await em.findAll(User, options);
  }

  async findById(id: string, options?: FindOneOrFailOptions<User, never, "*", never> | undefined) {
    const em = orm.em.fork();
    return await em.findOneOrFail(User, id, {
      ...options,
      failHandler: () => new NotFoundError(),
    }
    );
  }
}

export const contactRepository = new ContactRepository();