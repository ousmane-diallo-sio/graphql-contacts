import { GraphQLResolveInfo } from "graphql";
import { BadRequestError, GraphQLContactError } from "../../../exceptions/GraphQLContactError";
import { userRepository } from "./Repository";
import { CreateUserSchema, UpdateUserSchema } from "./ZodSchema";
import { parseResolveInfo } from "graphql-parse-resolve-info";
import { omit } from "../../../lib/utils";

export class UserGraphQLResolver {

  static instance = new UserGraphQLResolver();

  private constructor() { }

  async getUser(args: { id: string }) {
    return await userRepository.findById(args.id);
  }

  async createUser(args: { data: unknown, info: GraphQLResolveInfo }) {
    const validation = CreateUserSchema.safeParse(args.data);
    if (!validation.success) {
      console.error(this.createUser.name, validation.error.errors);
      throw new BadRequestError(validation.error.errors[0].message);
    }

    const res = await userRepository.create(validation.data);
    console.log('User created', res);

    // const parsedInfo = parseResolveInfo(args.info);
    // console.debug('---------------------------');
    // console.debug('info', parsedInfo);
    // console.debug('---------------------------');

    return res
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

  async login(args: { email: string, password: string }) : Promise<any> {
    const user = await userRepository.findByEmailForLogin(args.email);
    console.debug('user', user);
    if (!user.verifyPassword(args.password)) {
      throw new GraphQLContactError('Invalid email or password', 401);
    }
    return user.generateToken();
  }

}