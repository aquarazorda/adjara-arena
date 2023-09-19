import { Outlet } from "@remix-run/react";
import { loader$ } from "../api/root";
import { redirect } from "@remix-run/node";
import CMSMenu from "./menu";

export const loader = loader$(async ({ user }) => {
  const res = await user.get();
  return !res ? redirect("/cms/login") : true;
});

export default function CMSLayout() {
  return (
    <div className="flex bg-white">
      <CMSMenu />
      <main className="grow p-6">
        <Outlet />
      </main>
    </div>
  );
}
