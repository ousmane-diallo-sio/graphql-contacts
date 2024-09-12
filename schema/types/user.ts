import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull, 
    GraphQLID,
  } from 'graphql';

  import 
  
  export default new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        adress: {
            type: GraphQLString,
        },
        phoneNumber: {
            type: GraphQLString,
        },
        gender : {
            type: ,

        }
    },
  });