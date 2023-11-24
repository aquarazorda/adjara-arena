import type { ActionFunction, LoaderFunctionArgs } from '@remix-run/node';
import { serverRouter } from 'server/router';

type CallerType = ReturnType<typeof serverRouter.createCaller>;

export const loader$ =
  <R>(fn: (caller: CallerType, request: LoaderFunctionArgs) => Promise<R>) =>
  (args: LoaderFunctionArgs) => {
    return fn(
      serverRouter.createCaller({
        req: args.request,
      }),
      args
    );
  };

export function action$(handler: (caller: CallerType, request: Request) => Promise<Response>): ActionFunction {
  return async ({ request }) => {
    const caller = serverRouter.createCaller({ req: request });
    return handler(caller, request);
  };
}

export const serverCaller = (req: Request) => serverRouter.createCaller({ req });
