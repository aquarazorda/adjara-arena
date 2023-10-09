import { getLoaderLangs } from 'server/utils/request';
import { loader$ } from '~/routes/api/root';
import { db } from "server/db";
import { posts } from 'server/db/schema/posts';
import { desc, eq } from 'drizzle-orm';
import { dbCache } from 'server/redis';

export const mainPageLoader = loader$(async (caller, request) => {
  const langs = await getLoaderLangs(request, ["title"]);
  const data = await dbCache('posts:db', 5, () => db.query.posts.findMany({
    where: eq(posts.isPrivate, false),
    orderBy: desc(posts.createdAt),
    limit: 10,
  }));
  // const data = await caller.user.get();

  return { data, langs };
});