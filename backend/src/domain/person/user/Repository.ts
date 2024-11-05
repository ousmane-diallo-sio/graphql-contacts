import { ServerMessage } from '../../../types/response';
import { omit } from '../../../lib/utils';
import { User } from './Entity';
import { orm } from '../../..';
import { FilterQuery, FindAllOptions, FindOneOrFailOptions, LoadStrategy, PopulatePath, wrap } from '@mikro-orm/core';
import { NotFoundError } from '../../../exceptions/GraphQLContactError';
import { CreateUserDTO, UpdateUserDTO } from '.';
import { Address } from '../../address/Entity';
import { SocialNetworks } from '../../social-networks/Entity';

class UserRepository {

  async create(data: CreateUserDTO): Promise<any> {
    const em = orm.em.fork();

    // const user = new User();
    // user.email = data.email;
    // user.name = data.name;
    // user.phoneNumber = data.phoneNumber;
    // user.gender = data.gender;
    // user.height = data.height;
    // user.weight = data.weight;
    // user.password = data.password;

    // if (data.address) {
    //   const address = new Address();
    //   address.country = data.address.country;
    //   address.city = data.address.city;
    //   address.street = data.address.street;
    //   address.zipCode = data.address.zipCode;
    //   user.address = address;
    // }

    // if (user.socialNetworks) {
    //   const socialNetworks = new SocialNetworks();
    //   socialNetworks.facebookUrl = data.socialNetworks?.facebookUrl;
    //   socialNetworks.twitterUrl = data.socialNetworks?.twitterUrl;
    //   socialNetworks.instagramUrl = data.socialNetworks?.instagramUrl;
    //   socialNetworks.linkedinUrl = data.socialNetworks?.linkedinUrl;
    //   user.socialNetworks = socialNetworks;
    // }

    // await em.persistAndFlush(user);

    const user = em.create(User, {
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      height: data.height,
      weight: data.weight,
      password: data.password,
      address: data.address ? (
        new Address(data.address.street, data.address.city, data.address.country, data.address.zipCode)
       ) : undefined,
      socialNetworks: data.socialNetworks ? (
        new SocialNetworks(data.socialNetworks.facebookUrl, data.socialNetworks.twitterUrl, data.socialNetworks.instagramUrl, data.socialNetworks.linkedinUrl)
       ) : undefined,
       salt: 'will be defined later'
    });

    await em.flush();
    console.debug('user created, total count', (await this.findAll()).length);
    omit(user, ['password', 'salt']);

    return {
      ...user,
      jwt: user.generateToken()
    };
  }

  async update(id: string, data: UpdateUserDTO): Promise<any> {
    const em = orm.em.fork();
    const user = await em.findOneOrFail(User, { id: id }, { 
      failHandler: () => new NotFoundError() }
    );

    wrap(user).assign(data, { mergeObjectProperties: true });
    await em.persistAndFlush(user);

    return {
      ...user,
      jwt: user.generateToken()
    }
  }

  async delete(id: string) {
    const em = orm.em.fork();
    console.debug('deleting user', id);
    return await em.nativeDelete(User, { id });
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

  async findByEmailForLogin(email: string, options?: FindOneOrFailOptions<User, never, "*", never> | undefined) {
    const em = orm.em.fork();
    return await em.findOneOrFail(User, { email }, {
      ...options,
      fields: ['id', 'email', 'password', 'salt'],
      failHandler: () => new NotFoundError(),
    });
  }
}

export const userRepository = new UserRepository();