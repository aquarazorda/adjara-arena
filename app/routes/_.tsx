import { Outlet } from '@remix-run/react';
import CommandMenu from '~/components/admin/command-menu';
import Header from '~/components/header';

export default function MainPage() {
  return <>
    <Header />
    <Outlet />
    <CommandMenu />
  </>
}