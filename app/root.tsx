import { json } from '@remix-run/node';
import type { LoaderFunctionArgs, LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import './tailwind.css';
import { ThemeProvider } from './components/theme-provider';
import { useTranslation } from 'react-i18next';
import { ToastProvider } from './hooks/Toast';
import clsx from 'clsx';
import { parseCookies } from './lib/cookies';
import { auth } from 'server/auth/lucia';
import { UserProvider } from './hooks/user-provider';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './lib/queryClient';
import Header from './components/header';
import { Suspense, lazy } from 'react';

const CommandMenu = lazy(() => import('~/components/admin/command-menu'));

export async function loader({ request }: LoaderFunctionArgs) {
  const cookies = parseCookies(request.headers.get('Cookie') ?? '');
  const locale: string = cookies.lang || 'ka';
  const theme: string = cookies.theme || 'light';
  const authRequest = auth.handleRequest(request);
  const session = await authRequest.validate();
  const user = session?.user;

  return json({ locale, theme, user });
}

export let handle = {
  i18n: 'common',
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: 'https://newstatic.adjarabet.com/static/atomic/buildcss/new-fonts.css' },
  { rel: 'shortcut icon', href: '/assets/favicons/favicon-32.png' },
  { rel: 'apple-touch-icon-precomposed', href: '/assets/favicons/favicon-180.png' },
  { rel: 'icon', href: '/assets/favicons/favicon-32.png', sizes: '32x32' },
  { rel: 'icon', href: '/assets/favicons/favicon-192.png', sizes: '192x192' },
  { rel: 'apple-touch-icon-precomposed', href: '/assets/favicons/favicon-180.png' },
  { rel: 'mask-icon', href: '/assets/favicons/favicon-32.png' },
];

export default function App() {
  let { locale, theme, user } = useLoaderData<typeof loader>();
  let { i18n } = useTranslation();

  return (
    <html lang={locale} className={clsx('font-regular', theme === 'dark' && 'dark')} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white dark:bg-blue-gray-700 text-silver-800 dark:text-white">
        <QueryClientProvider client={queryClient}>
          <Suspense>
            {/* @ts-ignore https://github.com/remix-run/remix/issues/7599 */}
            <UserProvider user={user}>
              <ThemeProvider>
                <ToastProvider>
                  <Header />
                  <Suspense>
                    <Outlet />
                  </Suspense>
                  <CommandMenu />
                </ToastProvider>
              </ThemeProvider>
            </UserProvider>
          </Suspense>
        </QueryClientProvider>
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}
