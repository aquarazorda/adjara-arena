
import { createTRPCRouter } from '~/routes/api.trpc.$/trpc';
import { userRouter } from './routes/user';
import verificationRouter from './routes/verification';
import adminRouter from './routes/admin';

export const serverRouter = createTRPCRouter({
 user: userRouter,
 verification: verificationRouter,
 admin: adminRouter
});

export type AppRouter = typeof serverRouter;