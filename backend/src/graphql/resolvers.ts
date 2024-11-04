import { contactRepository } from "../domain/person/contact/Repository";
import { CreateUserDTO, UpdateUserDTO } from "../domain/person/user";
import { userRepository } from "../domain/person/user/Repository";
import { GraphQLContactError } from "../exceptions/GraphQLContactError";

export const graphQLResolvers = {
  getUser: async ({ id }: { id: string }) => {
      return await userRepository.findById(id);
  },
  getAllUsers: async () => {
    return await userRepository.findAll();
  },
  getContact: async ({ id }: { id: string }) => {
    return await contactRepository.findById(id);
  },
  getAllContacts: async () => {
    return await contactRepository.findAll();
  },
  createUser: async ({ email, name, password, gender }: CreateUserDTO) => {
    return await userRepository.create({ email, name, password, gender });
  },
  updateUser: async ({ id, email, name, password, gender }: UpdateUserDTO) => {
    return await userRepository.update(id, { email, name, password, gender });
  },
  deleteUser: async ({ id }: { id: string }) => {
    return await userRepository.delete(id);
  },
  login: async ({ email, password }: { email: string, password: string }) => {
    try {
      const user = await userRepository.findByEmailForLogin(email);
      if (!user.verifyPassword(password)) {
        throw new GraphQLContactError('Invalid email or password');
      }
      return {
        data: user,
        jwt: user.generateToken()
      }
    } catch (error) {
      throw new GraphQLContactError('Error logging in');
    }
  }
};