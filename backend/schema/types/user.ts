import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
  } from 'graphql';
  
  export default new GraphQLObjectType({
    name: 'User',
    fields: {
      name: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
  });