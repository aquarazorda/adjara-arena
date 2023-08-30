import type { V2_MetaFunction } from "@remix-run/node";
import { Button } from '~/components/ui/button';

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex gap-1">
      <h1>Welcome to Remix</h1>
      <Button>Clickando</Button>
    </div>
  );
}
