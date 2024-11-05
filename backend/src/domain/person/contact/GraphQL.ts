import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
} from 'graphql';
import { UserGraphQLType } from '../user/GraphQL';
import { GenderEnumGraphQLType, PersonGraphQLInterface, PersonGraphQLInterfaceFields } from '../GraphQL';
import { AddressInputType } from '../../address/GraphQL';
import { SocialNetworksInputType } from '../../social-networks/GraphQL';

export const ContactGraphQLType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Contact',
  interfaces: [PersonGraphQLInterface],
  fields: () => ({
    ...PersonGraphQLInterfaceFields,
    referral: { type: new GraphQLNonNull(UserGraphQLType) },
  }),
});

export const CreateContactInputType = new GraphQLInputObjectType({
  name: 'CreateContactInput',
  fields: () => ({
    email: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: AddressInputType },
    phoneNumber: { type: GraphQLString },
    gender: { type: new GraphQLNonNull(GenderEnumGraphQLType) },
    height: { type: GraphQLFloat },
    weight: { type: GraphQLFloat },
    socialNetworks: { type: SocialNetworksInputType },
    referral: { type: new GraphQLNonNull(GraphQLID) },
  }),
});

export const UpdateContactInputType = new GraphQLInputObjectType({
  name: 'UpdateContactInput',
  fields: {
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    address: { type: AddressInputType },
    phoneNumber: { type: GraphQLString },
    gender: { type: GenderEnumGraphQLType },
    height: { type: GraphQLFloat },
    weight: { type: GraphQLFloat },
    socialNetworks: { type: SocialNetworksInputType },
  },
});