import type { Config } from "drizzle-kit";
import { serverEnv } from 'server/env';

export default {
  schema: "./server/db/schema/*",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: serverEnv.POSTGRES_URL
  }
} satisfies Config;