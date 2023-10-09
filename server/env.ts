import { z } from 'zod';
require('dotenv').config();

const envSchema = z.object({
  POSTGRES_URL: z.string(),
  DB_HOST: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string().transform((val) => parseInt(val)),
  DB_DATABASE: z.string(),
  REDIS_PREFIX: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform((val) => parseInt(val)),
  REDIS_USERNAME: z.string(),
  REDIS_PASSWORD: z.string(),
});

const parsedEnv = envSchema.parse(process.env);

export const serverEnv = parsedEnv;