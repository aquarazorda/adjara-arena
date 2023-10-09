'use client';

import type { Jsonify } from "type-fest";
import type { InferSelectModel } from "drizzle-orm";
import type { posts } from "server/db/schema/posts";

type Props = {
  post: Jsonify<InferSelectModel<typeof posts>>;
};

export default function PostItem({ post: { id, image, title, publishDate } }: Props) {

  return image && title ? (
    <div key={"article_" + id} className='relative flex gap-3'>
      <img
          src={"https://static.adjarabetarena.com/" + image}
          className='h-44 w-44'
          alt={title}
        />
        <div className='h-full'>
          <span className='max-w-fit rounded-lg bg-red px-2 text-xxs uppercase text-white'>ფეხბურთი</span>
          <h3 className='font-medium text-base uppercase'>{title}</h3>
          {!!publishDate && <span className='mt-auto'>{publishDate}</span>}
        </div>
    </div>
  ) : null;
}
