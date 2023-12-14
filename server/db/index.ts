import { serverEnv } from 'server/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import schema from './schema';

export const pgClient = postgres(serverEnv.POSTGRES_URL, {
  user: serverEnv.DB_USERNAME,
  password: serverEnv.DB_PASSWORD,
  host: serverEnv.DB_HOST,
  port: Number(serverEnv.DB_PORT),
});

export const db = drizzle(pgClient, {
  schema,
  logger: process.env.NODE_ENV != 'production',
});
