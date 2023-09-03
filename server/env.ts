import { z } from 'zod';
require('dotenv').config();

const envSchema = z.object({
  POSTGRES_URL: z.string(),
});

const parsedEnv = envSchema.parse(process.env);

export const serverEnv = parsedEnv;