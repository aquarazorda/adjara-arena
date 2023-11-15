
import { createTRPCRouter } from '~/routes/api.trpc.$/trpc';
import { userRouter } from './routes/user';
import verificationRouter from './routes/verification';

export const serverRouter = createTRPCRouter({
 user: userRouter,
 verification: verificationRouter
});

export type AppRouter = typeof serverRouter;