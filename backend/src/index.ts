import EnvConfig from './lib/config/EnvConfig';
import express from 'express';
import { authErrorHandler, graphqljwt, jwt, requestLogger } from './lib/middlewares';
import bodyParser from 'body-parser';
import { MikroORM } from '@mikro-orm/postgresql';
import mikroORMConfig from './db/mikro-orm.config';
import { graphqlHTTP } from 'express-graphql';
import { graphQLSchema } from './graphql';
import { userRepository } from './domain/person/user/Repository';
import { GenderEnum } from './domain/person/Entity';

console.log('\n---------------------------');
console.log('📀 Server starting');
console.log('---------------------------');

const app = express();

export const orm = await MikroORM.init(mikroORMConfig);
// const generator = orm.getSchemaGenerator()
// await generator.clearDatabase()// ensure db exists and is fresh
// await orm.schema.createSchema();
// orm.getMigrator().up();
// await generator.updateSchema();
//await orm.schema.dropSchema();
// await generator.dropSchema()// ensure db exists and is freshs
// await generator.createSchema()// create db schema

console.log('✅ MikroORM initialized');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(requestLogger);

app.get('/', (req, res) => {
  res.contentType("application/json")
  res.send('Hello World!')
})

app.use(graphqljwt);

app.use("/graphql", graphqlHTTP({ schema: graphQLSchema, graphiql: true }))

app.use(authErrorHandler);


app.listen(EnvConfig.PORT, () => {
  console.log(`✅ Server running at http://${EnvConfig.HOST}:${EnvConfig.PORT}/`);
});