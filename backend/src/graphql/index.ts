import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { CreateUserInputType, UpdateUserInputType, UserGraphQLType } from "../domain/person/user/GraphQL";
import { userRepository } from "../domain/person/user/Repository";
import { ContactGraphQLType, CreateContactInputType, UpdateContactInputType } from "../domain/person/contact/GraphQL";
import { contactRepository } from "../domain/person/contact/Repository";
import { CreateContactSchema, UpdateContactSchema } from "../domain/person/contact/ZodSchema";
import { CreateUserSchema, UpdateUserSchema } from "../domain/person/user/ZodSchema";
import { UserGraphQLResolver } from "../domain/person/user/Resolvers";
import { ContactGraphQLResolver } from "../domain/person/contact/Resolvers";

export const graphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: UserGraphQLType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: async (_, { id }) => {
          return await UserGraphQLResolver.instance.getUser({ id });
        },
      },
      contact: {
        type: ContactGraphQLType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: async (_, { id }) => {
          return await ContactGraphQLResolver.instance.getContact({ id });
        },
      },
      contacts: {
        type: new GraphQLList(ContactGraphQLType),
        resolve: async () => {
          // TODO : Get jwt from context and extract user id
          const jwtId = '1';
          return await ContactGraphQLResolver.instance.getAllContacts({ id: jwtId });
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser: {
        type: UserGraphQLType,
        args: { input: { type: new GraphQLNonNull(CreateUserInputType) } },
        resolve: async (_, { input }) => {
          return await UserGraphQLResolver.instance.createUser({ data: input });
        },
      },
      updateUser: {
        type: UserGraphQLType,
        args: { input: { type: new GraphQLNonNull(UpdateUserInputType) }},
        resolve: async (_, { input }) => {
          // TODO : Get jwt from context and extract user id
          const jwtId = '1';
          return await UserGraphQLResolver.instance.updateUser({ id: jwtId, data: input });
        },
      },
      deleteUser: {
        type: GraphQLString,
        resolve: async (_, {}, ) => {
          // TODO : Get jwt from context and extract user id
          const jwtId = '1';
          await UserGraphQLResolver.instance.deleteUser({ id: jwtId });
          return 'User deleted';
        },
      },
      createContact: {
        type: ContactGraphQLType,
        args: { input: { type: new GraphQLNonNull(CreateContactInputType) } },
        resolve: async (_, { input }) => {
          return await ContactGraphQLResolver.instance.createContact({ data: input });
        },
      },
      updateContact: {
        type: ContactGraphQLType,
        args: { input: { type: new GraphQLNonNull(UpdateContactInputType) }},
        resolve: async (_, { input }) => {
          // TODO : Get jwt from context and extract user id
          const jwtId = '1';
          return await ContactGraphQLResolver.instance.updateContact({ id: jwtId, data: input });
        },
      },
      deleteContact: {
        type: GraphQLString,
        resolve: async (_, { }) => {
          // TODO : Get jwt from context and extract user id
          const jwtId = '1';
          await ContactGraphQLResolver.instance.deleteContact({ id: jwtId });
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
          return await UserGraphQLResolver.instance.login({ email, password });
        },
      },
    },
  }),
});