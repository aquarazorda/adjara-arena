import { Outlet } from '@remix-run/react';
import { loader$ } from '../api/root';
import { redirect } from '@remix-run/node';

export const loader = loader$(async () => {
  return redirect('/cms/login');
});

export default function CMSLayout() {
  return <>This is cms layout <Outlet /></>
}