import type { LoaderArgs } from "@remix-run/node";
import { serverRouter } from 'server/router';

export const loader$ =
  (
    fn: (caller: ReturnType<typeof serverRouter.createCaller>) => Promise<unknown>
  ) =>
  (args: LoaderArgs) =>
    fn(
      serverRouter.createCaller({
        req: args.request,
      })
    );
