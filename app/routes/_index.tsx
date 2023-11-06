import Header from "~/components/header";
import type { MetaFunction } from "@remix-run/react";
import { mainPageLoader } from "~/lib/loaders/mainPage";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = ({ data: { langs } }) => {
  return [{ title: langs.title }];
};

export const loader = mainPageLoader;

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1">
      <Header />
      <div className="p-4">
        <h2 className="text-base uppercase text-black">{t("now_reading")}</h2>
      </div>
    </div>
  );
}
