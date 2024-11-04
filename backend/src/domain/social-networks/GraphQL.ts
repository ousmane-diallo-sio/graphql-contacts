import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const SocialNetworksGraphQLType = new GraphQLObjectType({
  name: 'SocialNetworks',
  fields: {
    facebookUrl: { type: GraphQLString },
    twitterUrl: { type: GraphQLString },
    instagramUrl: { type: GraphQLString },
    linkedinUrl: { type: GraphQLString },
  },
});

export const SocialNetworksInputType = new GraphQLInputObjectType({
  name: 'SocialNetworksInput',
  fields: {
    facebookUrl: { type: GraphQLString },
    twitterUrl: { type: GraphQLString },
    instagramUrl: { type: GraphQLString },
    linkedinUrl: { type: GraphQLString },
  },
});
