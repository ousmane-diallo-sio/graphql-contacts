import EnvConfig from './lib/config/EnvConfig';
import express from 'express';
import { authErrorHandler, requestLogger } from './lib/middlewares';
import bodyParser from 'body-parser';
import { MikroORM } from '@mikro-orm/postgresql';
import mikroORMConfig from './db/mikro-orm.config';
import userController from './domain/person/user/Controller';
import { graphqlHTTP } from 'express-graphql';
import { schema as graphQLSchema } from './graphql';
import { graphQLResolvers } from './graphql/resolvers';

console.log('\n---------------------------');
console.log('📀 Server starting');
console.log('---------------------------');

const app = express();

export const orm = await MikroORM.init(mikroORMConfig);
console.log('✅ MikroORM initialized');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(requestLogger);


app.get('/', (req, res) => {
  res.contentType("application/json")
  res.send('Hello World!')
})

app.use("/graphql", graphqlHTTP({
  schema: graphQLSchema,
  rootValue: graphQLResolvers,
  graphiql: true
}))

app.use(authErrorHandler);


app.listen(EnvConfig.PORT, () => {
  console.log(`✅ Server running at http://${EnvConfig.HOST}:${EnvConfig.PORT}/`);
});