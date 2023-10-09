import { serverEnv } from 'server/env';
// import { drizzle } from 'drizzle-orm/postgres-js';
import { drizzle } from "drizzle-orm/mysql2";


import { posts } from './schema/posts';
import { createConnection } from 'mysql2';


const connection = createConnection({
  host: serverEnv.DB_HOST,
  user: serverEnv.DB_USERNAME,
  password: serverEnv.DB_PASSWORD,
  port: serverEnv.DB_PORT,
  database: serverEnv.DB_DATABASE
});
// export const pgClient = postgres(serverEnv.POSTGRES_URL);

// export const db = drizzle(pgClient, {
//   schema: {
//     ...user
//   }
// });

export const db = drizzle(connection, {
  mode: 'default',
  schema: { posts }
});