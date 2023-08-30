import { z } from 'zod'

const envSchema = z.object({
  POSTGRES_URL: z.string(),
});

const parsedEnv = envSchema.parse(process.env);

export const serverEnv = parsedEnv;