import { PostgreSqlDriver, Options, UnderscoreNamingStrategy, LoadStrategy } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import EnvConfig from '../lib/config/EnvConfig';
import { $ } from 'bun';

const mikroORMConfig: Options = {
  driver: PostgreSqlDriver,
  host: EnvConfig.DB_HOST,
  dbName: EnvConfig.DB_NAME,
  port: EnvConfig.DB_PORT,
  user: EnvConfig.DB_USER,
  password: EnvConfig.DB_PASSWORD,
  namingStrategy: UnderscoreNamingStrategy,
  loadStrategy: LoadStrategy.JOINED,
  // folder-based discovery setup, using common filename suffix
  entities: ['dist/**/Entity.js'],
  entitiesTs: ['src/**/Entity.ts'],
  // we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
  // check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
  metadataProvider: TsMorphMetadataProvider,
  // enable debug mode to log SQL queries and discovery information
  debug: process.env.NODE_ENV !== 'production',
};

export default mikroORMConfig;