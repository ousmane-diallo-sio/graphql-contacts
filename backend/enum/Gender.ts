import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'Gender',
  description: 'The possible gender for a human.',
  values: {
    FEMALE: {
      value: 'FEMALE'
    },
    MALE: {
      value: 'MALE'
    },
    OTHER: {
      value: 'UNKNOWN'
    }
  }
});