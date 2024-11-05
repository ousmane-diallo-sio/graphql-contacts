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

    const user = new User();
    user.email = data.email;
    user.name = data.name;
    user.phoneNumber = data.phoneNumber;
    user.gender = data.gender;
    user.height = data.height;
    user.weight = data.weight;
    user.password = data.password;

    if (data.address) {
      const address = new Address();
      address.country = data.address.country;
      address.city = data.address.city;
      address.street = data.address.street;
      address.zipCode = data.address.zipCode;
      user.address = address;
    }

    if (user.socialNetworks) {
      const socialNetworks = new SocialNetworks();
      socialNetworks.facebookUrl = data.socialNetworks?.facebookUrl;
      socialNetworks.twitterUrl = data.socialNetworks?.twitterUrl;
      socialNetworks.instagramUrl = data.socialNetworks?.instagramUrl;
      socialNetworks.linkedinUrl = data.socialNetworks?.linkedinUrl;
      user.socialNetworks = socialNetworks;
    }

    await em.persistAndFlush(user);

    return {
      data: user,
      jwt: user.generateToken()
    };
  }

  async update(id: string, data: UpdateUserDTO): Promise<any> {
    const em = orm.em.fork();
    const user = await em.findOneOrFail(User, id, { 
      failHandler: () => new NotFoundError() }
    );
    
    wrap(user).assign(data, { mergeObjectProperties: true });
    await em.persistAndFlush(user);

    return {
      data: user,
      jwt: user.generateToken()
    };
  }

  async delete(id: string) {
    const em = orm.em.fork();
    const userRef = em.getReference(User, id);
    return await em.removeAndFlush(userRef);
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
      failHandler: () => new NotFoundError(),
    });
  }
}

export const userRepository = new UserRepository();