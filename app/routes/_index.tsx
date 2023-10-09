import Header from "~/components/header";
import { getLoaderLangs } from "server/utils/request";
import { eq } from "drizzle-orm";
import { posts } from "server/db/schema/posts";
import type { MetaFunction} from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { mainPageLoader } from '~/lib/loaders/mainPage';

export const meta: MetaFunction = ({ data: { langs } }) => {
  return [{ title: langs.title }];
};

export const loader = mainPageLoader;

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="flex gap-1">
      <Header />
    </div>
  );
}
