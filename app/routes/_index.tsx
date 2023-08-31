import type { V2_MetaFunction } from "@remix-run/node";
import { loader$ } from './api/root';
import Header from '~/components/header';

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


export const loader = loader$(async (caller) => {
  const data = await caller.user.get();
  return data;
})

export default function Index() {
   return (
    <div className="flex gap-1">
      <Header/>
    </div>
  );
}
