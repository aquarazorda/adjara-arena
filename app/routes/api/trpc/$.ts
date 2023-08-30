import { createTRPCContext } from '~/routes/api/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { serverRouter } from 'server/router';
// Both Action and Loaders will point to tRPC Router
export const loader = async (args: LoaderArgs) => {
 return handleRequest(args);
};
export const action = async (args: ActionArgs) => {
 return handleRequest(args);
};
function handleRequest(args: LoaderArgs | ActionArgs) {
 return fetchRequestHandler({
   endpoint: '/api/trpc',
   req: args.request,
   router: serverRouter,
   createContext: createTRPCContext,
 });
}