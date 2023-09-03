import postgres from 'postgres';
import { serverEnv } from 'server/env';
import { drizzle } from 'drizzle-orm/postgres-js';

import * as user from './schema/user';

export const pgClient = postgres(serverEnv.POSTGRES_URL);

export const db = drizzle(pgClient, {
  schema: {
    ...user
  }
});