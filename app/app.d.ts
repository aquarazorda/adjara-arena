/// <reference types="vite-plugin-svgr/client" />
/// <reference types="lucia" />

import type { user } from 'server/db/schema/user';
import type * as LuciaServer from 'server/auth/lucia';

declare global {
  namespace Lucia {
    type Auth = LuciaServer.Auth;
    type DatabaseUserAttributes = Omit<typeof user.$inferSelect, "id">;
  }
}