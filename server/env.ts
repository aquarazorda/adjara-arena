import { z } from 'zod';

const envSchema = z.object({
  APP_DOMAIN: z.string(),
  DB_HOST: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string().transform((val) => parseInt(val)),
  DB_DATABASE: z.string(),
  REDIS_PREFIX: z.string().optional(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform((val) => parseInt(val)),
  REDIS_USERNAME: z.string(),
  REDIS_PASSWORD: z.string().optional(),
  SESSION_SECRET: z.string(),
  SAML_ENTITY_ID: z.string(),
  SAML_CERT_PATH: z.string(),
  SAML_KEY_PATH: z.string(),
  SAML_PRIVATE_KEY_PASS: z.string(),
  SAML_IDP_METADATA: z.string(),
  SAML_CALLBACK: z.string(),
  SAML_LOGIN_URL: z.string(),
  SMS_SERVICE_PATH: z.string(),
  SMS_SERVICE_TOKEN: z.string(),
  SMS_SERVICE_SENDERNAME: z.string()
})
.transform((val) => ({
  ...val,
  POSTGRES_URL: `postgres://${val.DB_USERNAME}:${val.DB_PASSWORD}@${val.DB_HOST}:${val.DB_PORT}/${val.DB_DATABASE}`,
}))

const parsedEnv = envSchema.parse(process.env);

export const serverEnv = parsedEnv;
