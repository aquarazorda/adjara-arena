import { eq } from 'drizzle-orm';
import { db } from 'server/db';
import { cmsUser } from 'server/db/schema/cms_user';
export type CmsUser = typeof cmsUser.$inferSelect;
export type NewCmsUser = typeof cmsUser.$inferInsert;

export async function getUserById(id: number): Promise<CmsUser | undefined> {
  const user = await db.query.cmsUser.findFirst({
    where: eq(cmsUser.id, id),
  });

  return user;
}

export async function getUserByEmail(email: string): Promise<CmsUser | undefined> {
  const user = await db.query.cmsUser.findFirst({
    where: eq(cmsUser.email, email),
  });

  return user;
}

export async function createUser(data: NewCmsUser): Promise<CmsUser> {
  const result = await db.insert(cmsUser).values(data).returning();

  return result[0];
}
