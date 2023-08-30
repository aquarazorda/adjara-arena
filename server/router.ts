import { createTRPCRouter } from '~/routes/api/trpc';
import { userRouter } from './routes/user';

export const serverRouter = createTRPCRouter({
 user: userRouter 
});

export type AppRouter = typeof serverRouter;