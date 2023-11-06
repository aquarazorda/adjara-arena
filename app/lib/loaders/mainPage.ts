import { getLoaderLangs } from 'server/utils/request';
import { loader$ } from '~/routes/api/root';
import { db } from "server/db";
import { posts } from 'server/db/schema/posts';
import { and, desc, eq } from 'drizzle-orm';
import { dbCache } from 'server/redis';

export const mainPageLoader = loader$(async (caller, request) => {
  const langs = await getLoaderLangs(request, ["title"]);
  // const data = await dbCache('posts:db', 5, () => db.query.posts.findMany({
  //   where: and(eq(posts.isPrivate, false), eq(posts.isDraft, false)),
  //   orderBy: desc(posts.createdAt),
  //   limit: 10,
  // }));
  // const data = await db.query.posts.findMany({
  //   where: and(eq(posts.isPrivate, false), eq(posts.isDraft, false)),
  //   orderBy: desc(posts.createdAt),
  //   limit: 10,
  // });

  return { langs };
});