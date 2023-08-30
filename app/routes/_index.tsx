import type { V2_MetaFunction } from "@remix-run/node";
import { loader$ } from './api/root';
import { useLoaderData } from '@remix-run/react';
import { ThemeToggle } from '~/components/theme-toggle';

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
  const data = useLoaderData<typeof loader>();
  
  return (
    <div className="flex gap-1">
      <ThemeToggle />
    </div>
  );
}
