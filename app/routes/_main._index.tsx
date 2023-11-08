import { type MetaFunction } from "@remix-run/react";
import { mainPageLoader } from "~/lib/loaders/mainPage";

export const meta: MetaFunction = ({ data: { langs } }) => {
  return [{ title: langs.title }];
};

export const loader = mainPageLoader;

export default function Index() {
  return (
    <div className="flex flex-col gap-1">
      Home page
    </div>
  );
}
