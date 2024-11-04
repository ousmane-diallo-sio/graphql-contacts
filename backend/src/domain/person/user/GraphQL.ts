import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInterfaceType
} from 'graphql';
import { ContactGraphQLType } from '../contact/GraphQL';
import { GenderEnumGraphQLType, PersonGraphQLInterface } from '../GraphQL';
import { AddressInputType } from '../../address/GraphQL';
import { SocialNetworksInputType } from '../../social-networks/GraphQL';

export const UserGraphQLType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  interfaces: [PersonGraphQLInterface],
  fields: {
    ...PersonGraphQLInterface.getFields(),
    password: { type: new GraphQLNonNull(GraphQLString) },
    salt: { type: new GraphQLNonNull(GraphQLString) },
    contacts: { type: new GraphQLList(ContactGraphQLType) },
  },
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: AddressInputType },
    phoneNumber: { type: GraphQLString },
    gender: { type: new GraphQLNonNull(GenderEnumGraphQLType) },
    height: { type: GraphQLFloat },
    weight: { type: GraphQLFloat },
    socialNetworks: { type: SocialNetworksInputType },
    password: { type: new GraphQLNonNull(GraphQLString) },
    
  },
});

export const UpdateUserInputType = new GraphQLInputObjectType({
  name: 'UpdateUserInput',
  fields: {
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    address: { type: AddressInputType },
    phoneNumber: { type: GraphQLString },
    gender: { type: GenderEnumGraphQLType },
    height: { type: GraphQLFloat },
    weight: { type: GraphQLFloat },
    socialNetworks: { type: SocialNetworksInputType },
    password: { type: GraphQLString },
  },
});