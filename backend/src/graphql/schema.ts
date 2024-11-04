import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { userRepository } from '../domain/person/user/Repository';
import { contactRepository } from '../domain/person/contact/Repository';
import { CreateUserInputType, UpdateUserInputType, UserGraphQLType } from '../domain/person/user/GraphQL';
import { ContactGraphQLType, CreateContactInputType, UpdateContactInputType } from '../domain/person/contact/GraphQL';

export const graphQLQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserGraphQLType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { id }) => {
        return await userRepository.findById(id);
      },
    },
    users: {
      type: new GraphQLList(UserGraphQLType),
      resolve: async () => {
        return await userRepository.findAll();
      },
    },
    contact: {
      type: ContactGraphQLType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { id }) => {
        return await contactRepository.findById(id);
      },
    },
    contacts: {
      type: new GraphQLList(ContactGraphQLType),
      resolve: async () => {
        return await contactRepository.findAll();
      },
    },
  },
});

export const graphQLMutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserGraphQLType,
      args: { input: { type: new GraphQLNonNull(CreateUserInputType) } },
      resolve: async (_, { input }) => {
        const parsedInput = CreateUserSchema.parse(input);
        return await userRepository.create(parsedInput);
      },
    },
    updateUser: {
      type: UserGraphQLType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        input: { type: new GraphQLNonNull(UpdateUserInputType) },
      },
      resolve: async (_, { id, input }) => {
        const parsedInput = UpdateUserSchema.parse(input);
        return await userRepository.update(id, parsedInput);
      },
    },
    deleteUser: {
      type: GraphQLString,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { id }) => {
        await userRepository.delete(id);
        return 'User deleted';
      },
    },
    createContact: {
      type: ContactGraphQLType,
      args: { input: { type: new GraphQLNonNull(CreateContactInputType) } },
      resolve: async (_, { input }) => {
        const parsedInput = CreateContactSchema.parse(input);
        return await contactRepository.create(parsedInput);
      },
    },
    updateContact: {
      type: ContactGraphQLType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        input: { type: new GraphQLNonNull(UpdateContactInputType) },
      },
      resolve: async (_, { id, input }) => {
        const parsedInput = UpdateContactSchema.parse(input);
        return await contactRepository.update(id, parsedInput);
      },
    },
    deleteContact: {
      type: GraphQLString,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { id }) => {
        await contactRepository.delete(id);
        return 'Contact deleted';
      },
    },
    login: {
      type: GraphQLString,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, { email, password }) => {
        const user = await userRepository.findByEmailForLogin(email);
        if (!user.verifyPassword(password)) {
          throw new Error('Invalid email or password');
        }
        return user.generateToken();
      },
    },
  },
});