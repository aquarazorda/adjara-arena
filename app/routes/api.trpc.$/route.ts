
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { serverRouter } from 'server/router';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/server-runtime';
import { createTRPCContext } from './trpc';

export const loader = async (args: LoaderFunctionArgs) => {
  return handleRequest(args);
};

export const action = async (args: ActionFunctionArgs) => {
  return handleRequest(args);
};

function handleRequest(args: LoaderFunctionArgs | ActionFunctionArgs) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: args.request,
    router: serverRouter,
    createContext: createTRPCContext,
  });
}
