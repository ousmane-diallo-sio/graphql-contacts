import { BadRequestError, GraphQLContactError } from "../../../exceptions/GraphQLContactError";
import { userRepository } from "./Repository";
import { CreateUserSchema, UpdateUserSchema } from "./ZodSchema";


export class UserGraphQLResolver {

  static instance = new UserGraphQLResolver();

  private constructor() { }

  async getUser(args: { id: string }) {
    return await userRepository.findById(args.id);
  }

  async createUser(args: { data: unknown }) {
    const validation = CreateUserSchema.safeParse(args.data);
    if (!validation.success) {
      console.error(this.createUser.name, validation.error.errors);
      throw new BadRequestError(validation.error.errors[0].message);
    }

    return await userRepository.create(validation.data);
  }

  async updateUser(args: { id: string, data: unknown }) {
    const validation = UpdateUserSchema.safeParse(args?.data);
    if (!validation.success) {
      throw new BadRequestError(validation.error.errors[0].message);
    }

    return await userRepository.update(args.id, validation.data);
  }

  async deleteUser(args: { id: string }) {
    return await userRepository.delete(args.id);
  }

  async login(args: { email: string, password: string }) {
    const user = await userRepository.findByEmailForLogin(args.email);
    if (!user.verifyPassword(args.password)) {
      throw new GraphQLContactError('Invalid email or password', 401);
    }
    return {
      data: user,
      jwt: user.generateToken()
    }
  }

}