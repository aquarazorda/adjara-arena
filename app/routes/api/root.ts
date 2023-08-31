import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { serverRouter } from "server/router";
import { parseFormData } from "server/utils/request";
import type { ZodSchema, z } from 'zod';

export const loader$ =
  <R>(
    fn: (
      caller: ReturnType<typeof serverRouter.createCaller>
    ) => Promise<R>
  ) =>
  ({ request }: LoaderArgs) =>
    fn(
      serverRouter.createCaller({
        req: request,
      })
    );

export const action$ =
  <T, R>(
    schema: ZodSchema<T>,
    fn: (
      formData: z.infer<typeof schema>,
      caller: ReturnType<typeof serverRouter.createCaller>
    ) => Promise<R>
  ) =>
  async ({ request }: ActionArgs) =>
    fn(
      parseFormData(await request.formData()),
      serverRouter.createCaller({ req: request })
    );

export const serverCaller = (req: Request) =>
  serverRouter.createCaller({ req });
