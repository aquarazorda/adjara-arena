import postgres from 'postgres';
import { serverEnv } from 'server/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import schema from './schema';

const client = postgres(serverEnv.POSTGRES_URL);
export const db = drizzle(client, { schema });