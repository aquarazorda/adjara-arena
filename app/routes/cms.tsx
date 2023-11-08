import { Outlet, useLoaderData } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/node';
import { requireUserId } from 'server/services/session.service';

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);

  return userId;
}

export default function CMSLayout() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      This is cms layout {data} <Outlet />
    </>
  );
}
