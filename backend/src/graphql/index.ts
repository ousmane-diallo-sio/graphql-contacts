import { GraphQLSchema } from "graphql";
import { graphQLMutationType, graphQLQueryType } from "./schema";

export const schema = new GraphQLSchema({
  query: graphQLQueryType,
  mutation: graphQLMutationType,
});