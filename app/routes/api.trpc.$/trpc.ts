import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { auth } from 'server/auth/lucia';

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

const isAuthenticatedMiddleware = t.middleware(async (opts) => {
  const authRequest = auth.handleRequest(opts.ctx.req);
  const session = await authRequest.validate();
  
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ...opts,
    ctx: {
      req: opts.ctx.req,
      user: session.user
    }
  });
})

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
export const privateProcedure = publicProcedure.use(isAuthenticatedMiddleware);
