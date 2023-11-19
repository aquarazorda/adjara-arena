import { eq, or } from 'drizzle-orm';
import { LuciaError } from 'lucia';
import { auth } from 'server/auth/lucia';
import { db } from 'server/db';
import { user } from 'server/db/schema/user';
import { saveLog } from 'server/services/logger.service';
import { createFormErrorReturn } from 'server/utils/form';
import { Ok } from 'ts-results';
import { authSchema } from '~/lib/schemas/auth';
import { publicProcedure } from '~/routes/api.trpc.$/trpc';

export const authenticate = publicProcedure.input(authSchema).mutation(async ({ input, ctx }) => {
  const errorResponse = createFormErrorReturn(input);

  try {
    const dbUser = await db.query.user.findFirst({
      where: or(eq(user.email, input.emailOrUsername), eq(user.phone_number, input.emailOrUsername)),
    });

    if (!dbUser) {
      return errorResponse({ emailOrUsername: 'invalid_email_or_phone_number' });
    }

    const key = await auth.useKey('username', dbUser.username, input.password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const sessionCookie = auth.createSessionCookie(session);

    ctx.resHeaders?.set('Set-Cookie', sessionCookie.serialize());

    saveLog({
      user_id: dbUser.id,
      activity_type: 'auth_success',
    });
    
    return Ok(session.user);
  } catch (e: any) {
    if (e instanceof LuciaError && (e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')) {
      return errorResponse({ emailOrUsername: 'invalid_email_or_phone_number' });
    }

    throw new Error(e);
  }
});
