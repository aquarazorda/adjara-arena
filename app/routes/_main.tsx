import { Outlet } from '@remix-run/react';
import Header from '~/components/header';

export default function MainPage() {
  return <>
    <Header />
    <Outlet />
  </>
}