import { GraphQLFieldConfig, GraphQLFieldResolver, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLResolveInfo, GraphQLSchema, GraphQLString } from "graphql";
import { UserGraphQLResolver } from "../domain/person/user/Resolvers";
import { ContactGraphQLResolver } from "../domain/person/contact/Resolvers";
import { AuthenticationError, GraphQLContactError } from "../exceptions/GraphQLContactError";
import { CreateUserInputType, UpdateUserInputType, UserGraphQLType } from "../domain/person/user/GraphQL";
import { ContactGraphQLType, CreateContactInputType, UpdateContactInputType } from "../domain/person/contact/GraphQL";

const requireAuth = (resolver: GraphQLFieldResolver<any, any>) => (source: any, args: any, context: any, info: GraphQLResolveInfo) => {
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
        resolve: requireAuth(async (_, args, context, info) => {
          const id = context.auth.id;
          return await UserGraphQLResolver.instance.getUser({ id });
        }),
      },
      contact: {
        type: ContactGraphQLType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: requireAuth(async (_, { id }) => {
          return await ContactGraphQLResolver.instance.getContact({ id });
        }),
      },
      contacts: {
        type: new GraphQLList(ContactGraphQLType),
        resolve: requireAuth(async (_, args, context, info) => {
          const userId = context.auth.id;
          return await ContactGraphQLResolver.instance.getAllContacts({ id: userId });
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
        resolve: async (_, { input }, context, info) => {
          return await UserGraphQLResolver.instance.createUser({ data: input, info }).catch(GraphQLContactError.format);
        },
      },
      updateUser: {
        type: UserGraphQLType,
        args: { input: { type: new GraphQLNonNull(UpdateUserInputType) }},
        resolve: requireAuth(async (source, { input }, context, info) => {
          const userId = context.auth.id;
          return await UserGraphQLResolver.instance.updateUser({ id: userId, data: input }).catch(GraphQLContactError.format);
        }),
      },
      deleteUser: {
        type: GraphQLString,
        resolve: requireAuth(async (source, args, context, info) => {
          const userId = context.auth.id;
          await UserGraphQLResolver.instance.deleteUser({ id: userId }).catch(GraphQLContactError.format);
          return 'User deleted';
        }),
      },
      createContact: {
        type: ContactGraphQLType,
        args: { input: { type: new GraphQLNonNull(CreateContactInputType) } },
        resolve: requireAuth(async (_, { input }, context, info) => {
          const userId = context.auth.id;
          return await ContactGraphQLResolver.instance
            .createContact({ referalId: userId, data: input })
            .catch(GraphQLContactError.format);
        }),
      },
      updateContact: {
        type: ContactGraphQLType,
        args: { input: { type: new GraphQLNonNull(UpdateContactInputType) }},
        resolve: requireAuth(async (_, { input }, context, info) => {
          const userId = context.auth.id;
          return await ContactGraphQLResolver.instance.updateContact({ id: userId, data: input }).catch(GraphQLContactError.format);
        }),
      },
      deleteContact: {
        type: GraphQLString,
        args: { input: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: requireAuth(async (_, { input }, context, info) => {
          const userId = context.auth.id;
          await ContactGraphQLResolver.instance.deleteContact({ userId: userId, id: input }).catch(GraphQLContactError.format);
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
          return await UserGraphQLResolver.instance.login({ email, password }).catch(GraphQLContactError.format);
        },
      },
    },
  }),
});