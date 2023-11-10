/// <reference types="vite-plugin-svgr/client" />
/// <reference types="lucia" />

import type { user } from 'server/db/schema/user';

declare global {
  namespace Lucia {
    type DatabaseUserAttributes = Omit<typeof user.$inferSelect, "id">;
  }
}