import {
  createTRPCProxyClient,
  httpLink,
  loggerLink,
} from '@trpc/client';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from 'server/router';
import superjson from 'superjson';


const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  // Change it to point to you SSR base URL
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};


export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === 'development' ||
        (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpLink({
      url: `${getBaseUrl()}/api/trpc`, // We need to setup Server Side API to point to this
    }),
  ],
});


export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;