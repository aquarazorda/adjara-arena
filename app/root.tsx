import { json } from '@remix-run/node';
import type { LoaderFunctionArgs, LinksFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import './tailwind.css';
import { ThemeProvider } from './components/theme-provider';
import { useTranslation } from 'react-i18next';
import { parseCookies } from 'server/utils/request';
import { ToastProvider } from './hooks/useToast';

export async function loader({ request }: LoaderFunctionArgs) {
  const cookies = parseCookies(request.headers.get('Cookie') ?? '');
  let locale = cookies.lang || 'ka';

  return json({ locale });
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
  let { locale } = useLoaderData<typeof loader>();
  let { i18n } = useTranslation();

  return (
    <html lang={locale} className="dark font-regular" dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-light-bg dark:bg-dark-blue">
        <ThemeProvider>
          <ToastProvider>
            <>
              <Outlet />
            </>
          </ToastProvider>
          <ScrollRestoration />
          <LiveReload />
          <Scripts />
        </ThemeProvider>
      </body>
    </html>
  );
}
