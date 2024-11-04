import {
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInterfaceType,
} from 'graphql';
import { AddressGraphQLType } from '../address/GraphQL';
import { SocialNetworksGraphQLType } from '../social-networks/GraphQL';

export const GenderEnumGraphQLType = new GraphQLEnumType({
  name: 'Gender',
  values: {
    MALE: { value: 'MALE' },
    FEMALE: { value: 'FEMALE' },
    UNKNOWN: { value: 'UNKNOWN' },
  },
});

export const PersonGraphQLInterface = new GraphQLInterfaceType({
  name: 'Person',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: AddressGraphQLType },
    phoneNumber: { type: GraphQLString },
    gender: { type: new GraphQLNonNull(GenderEnumGraphQLType) },
    height: { type: GraphQLFloat },
    weight: { type: GraphQLFloat },
    socialNetworks: { type: SocialNetworksGraphQLType },
  },
});
