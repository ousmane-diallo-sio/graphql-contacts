import {
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import {
  connectionFromArray,
  getOffsetWithDefault,
  forwardConnectionArgs,
  connectionFromArraySlice,
}  from 'graphql-relay';
import UserConnection from '../connections/UserConnection';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLNonNull(UserConnection),
      description: 'The users of Star Wars.',
      args: forwardConnectionArgs,
      resolve: async (_, args, database) => {
        const offset = getOffsetWithDefault(args.after, 0);
        const limit = args.first || 100;
        let { data, count } = await database
          .from('users')
          .select('*', { count: 'exact' })
          .range(offset, offset + limit);
        if (!data)
          return {
            totalCount: 0,
            ...connectionFromArray([], args),
          };
        return {
          totalCount: count,
          ...connectionFromArraySlice(data, args, {
            sliceStart: offset,
            arrayLength: count,
          }),
        };
      },
    },
  }
});
