const EnvConfig = {
  HOST: process.env.HOST ?? "127.0.0.1",
  PORT: process.env.PORT ?? 3005,
  DB_NAME: process.env.DB_NAME ?? "missing DB name",
  DB_USER: process.env.DB_USER ?? "missing DB user",
  DB_HOST: process.env.DB_HOST ?? "missing DB host",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "missing DB password",
  DB_PORT: parseInt(process.env.DB_PORT ?? '0'),
  JWT_SECRET: process.env.JWT_SECRET ?? "missing JWT secret",
}

export default EnvConfig