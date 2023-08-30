import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { parseCookies } from 'server/utils/request';

export type Context = {
  req: Request;
  user?: {}
};

export const createTRPCContext = ({
  req
}: FetchCreateContextFnOptions) => ({
  req
});

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
  allowOutsideOfServer: true,
});

const isAuthenticatedMiddleware = t.middleware((opts) => {
  const cookies = parseCookies(opts.ctx.req.headers.get('Cookie'));
  if (cookies.token) {
    // todo check token
  }

  return opts.next(opts);
})

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
export const privateProcedure = publicProcedure.use(isAuthenticatedMiddleware);
