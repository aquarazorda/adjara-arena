import { serverEnv } from 'server/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { RDS } from 'sst/node/rds';
import pkg from 'aws-sdk';

import schema from './schema';

const client = new pkg.SecretsManager();
const dbData = await client.getSecretValue({ SecretId: RDS.Database.secretArn }).promise();

if (!dbData?.SecretString) {
  throw new Error('Could not get secret for RDS');
}

const creds = JSON.parse(dbData.SecretString);

export const pgClient = postgres(serverEnv.POSTGRES_URL, {
  host: creds.host,
  port: creds.port,
  username: creds.username,
  password: creds.password,
  database: creds.dbname,
});

export const db = drizzle(pgClient, {
  schema,
  logger: process.env.NODE_ENV != 'production',
});
