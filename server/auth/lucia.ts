import { lucia } from "lucia";
import { web } from "lucia/middleware";
import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql";
import { pgClient } from 'server/db';

export const auth = lucia({
	env: "DEV",
	middleware: web(),
	sessionCookie: {
		expires: false
	},
  adapter: postgresAdapter(pgClient, {
		user: "auth_user",
		key: "user_key",
		session: "user_session"
	})
});

export type Auth = typeof auth;