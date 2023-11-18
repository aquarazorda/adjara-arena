import { PgEnum } from 'drizzle-orm/pg-core';

export type DrizzlePgEnum<Type> = Type extends PgEnum<infer X> ? X[number] : never;