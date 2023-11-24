import { useLoaderData } from '@remix-run/react';
import { loader$ } from 'app/routes/api.trpc.$/root';

export const loader = loader$((caller) => {
  return caller.setanta.getMatches();
});

export default function SetantaPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  return <div>This is setanta page.</div>;
}
