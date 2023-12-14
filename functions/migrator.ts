import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from 'server/db';
import { ApiHandler } from 'sst/node/api';

export const handler = ApiHandler(async () => {
  const migrationsFolder = 'drizzle';
  await migrate(db, migrationsFolder);

  return {
    body: 'Migrations complete.',
  };
});
