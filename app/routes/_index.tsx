import Header from "~/components/header";
import type { MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { mainPageLoader } from "~/lib/loaders/mainPage";
import { useTranslation } from "react-i18next";
import PostItem from "~/components/posts/PostItem";

export const meta: MetaFunction = ({ data: { langs } }) => {
  return [{ title: langs.title }];
};

export const loader = mainPageLoader;

export default function Index() {
  const { t } = useTranslation();
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-1">
      <Header />
      <div className="p-4">
        <h2 className="text-base uppercase text-black">{t("now_reading")}</h2>
        <div className="mt-5 flex flex-col gap-3">
          {data.map((post) => (
            <PostItem key={"article_" + post.title} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
