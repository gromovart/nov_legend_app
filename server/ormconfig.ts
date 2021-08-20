import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

export = {
  type: String(process.env.DB_TYPE),
  host: String(process.env.POSTGRES_HOST),
  port: Number(process.env.POSTGRES_PORT),
  username: String(process.env.POSTGRES_USER),
  password: String(process.env.POSTGRES_PASSWORD),
  database: String(process.env.POSTGRES_DB),
  synchronize: false,
  cache: false,
  entities: ['database/entities/**/*{.ts,.js}'],
  migrations: ['database/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'database/migrations',
    entitiesDir: 'database/entities',
  },
  logging: ((): LoggerOptions => {
    return ['migration', 'error'];
  })(),
};
