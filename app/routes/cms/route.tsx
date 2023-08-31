import { Outlet } from '@remix-run/react';
import { loader$ } from '../api/root';
import { redirect } from '@remix-run/node';

export const loader = loader$(async ({ user }) => {
  const res = await user.get();
  return !res ? redirect('/cms/login') : true;
});

export default function CMSLayout() {
  return <>This is cms layout <Outlet /></>
}