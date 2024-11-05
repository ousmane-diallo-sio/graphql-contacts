import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLResolveInfo, GraphQLSchema, GraphQLString } from "graphql";
import { UserGraphQLResolver } from "../domain/person/user/Resolvers";
import { ContactGraphQLResolver } from "../domain/person/contact/Resolvers";
import { AuthenticationError, GraphQLContactError } from "../exceptions/GraphQLContactError";
import { CreateUserInputType, UpdateUserInputType, UserGraphQLType } from "../domain/person/user/GraphQL";
import { ContactGraphQLType, CreateContactInputType, UpdateContactInputType } from "../domain/person/contact/GraphQL";

const requireAuth = (resolver: GraphQLFieldResolver<any, any>) => (source: any, args: any, context: any, info: GraphQLResolveInfo) => {
  console.debug('requireAuth', source, args, context, info);
  if (!context) {
    throw new AuthenticationError();
  }
  return resolver(source, args, context, info);
}

export const graphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: UserGraphQLType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: requireAuth(async (_, { id }) => {
          return await UserGraphQLResolver.instance.getUser({ id });
        }),
      },
      contact: {
        type: ContactGraphQLType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: requireAuth(async (_, { id }) => {
          // TODO : Get jwt from context and extract user id
          // TODO : Check if user has access to this contact
          const jwtId = '1';
          return await ContactGraphQLResolver.instance.getContact({ id });
        }),
      },
      contacts: {
        type: new GraphQLList(ContactGraphQLType),
        resolve: requireAuth(async () => {
          // TODO : Get jwt from context and extract user id
          const jwtId = '1';
          return await ContactGraphQLResolver.instance.getAllContacts({ id: jwtId });
        }),
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
          return await UserGraphQLResolver.instance.createUser({ data: input }).catch(GraphQLContactError.format);
        },
      },
      updateUser: {
        type: UserGraphQLType,
        args: { input: { type: new GraphQLNonNull(UpdateUserInputType) }},
        resolve: requireAuth(async (_, { input }) => {
          // TODO : Get jwt from context and extract user id
          const jwtId = '1';
          return await UserGraphQLResolver.instance.updateUser({ id: jwtId, data: input });
        }),
      },
      deleteUser: {
        type: GraphQLString,
        resolve: requireAuth(async (_, {}, ) => {
          // TODO : Get jwt from context and extract user id
          const jwtId = '1';
          await UserGraphQLResolver.instance.deleteUser({ id: jwtId });
          return 'User deleted';
        }),
      },
      createContact: {
        type: ContactGraphQLType,
        args: { input: { type: new GraphQLNonNull(CreateContactInputType) } },
        resolve: requireAuth(async (_, { input }) => {
          return await ContactGraphQLResolver.instance.createContact({ data: input });
        }),
      },
      updateContact: {
        type: ContactGraphQLType,
        args: { input: { type: new GraphQLNonNull(UpdateContactInputType) }},
        resolve: requireAuth(async (_, { input }) => {
          // TODO : Get jwt from context and extract user id
          const jwtId = '1';
          return await ContactGraphQLResolver.instance.updateContact({ id: jwtId, data: input });
        }),
      },
      deleteContact: {
        type: GraphQLString,
        resolve: requireAuth(async (_, { }) => {
          // TODO : Get jwt from context and extract user id
          const jwtId = '1';
          await ContactGraphQLResolver.instance.deleteContact({ id: jwtId });
          return 'Contact deleted';
        }),
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