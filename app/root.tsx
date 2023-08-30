import { json, type LinksFunction, type LoaderArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import styles from "./tailwind.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import { ThemeProvider } from "./components/theme-provider";
import { useTranslation } from 'react-i18next';
import { parseCookies } from 'server/utils/request';

export async function loader({ request }: LoaderArgs) {
  const cookies = parseCookies(request.headers.get('Cookie') ?? '');
  let locale = cookies.lang || 'ka';
  
  return json({ locale });
}

export let handle = {
  i18n: "common",
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "shortcut icon", href: "/assets/favicons/favicon-32.png" },
  { rel: "apple-touch-icon-precomposed", href: "/assets/favicons/favicon-180.png" },
  { rel: "icon", href: "/assets/favicons/favicon-32.png", sizes: "32x32" },
  { rel: "icon", href: "/assets/favicons/favicon-192.png", sizes: "192x192" },
  { rel: "apple-touch-icon-precomposed", href: "/assets/favicons/favicon-180.png" },
  { rel: "mask-icon", href: "/assets/favicons/favicon-32.png" },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  let { locale } = useLoaderData<typeof loader>();
  let { i18n } = useTranslation();

  return (
    <html lang={locale} className='dark' dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </ThemeProvider>
      </body>
    </html>
  );
}
