import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getRefreshToken } from "./auth/authApi.ts";

const EXPIRATION_BUFFER = 60 * 1000;

export const { auth, handlers, signIn, signOut } = NextAuth({
	providers: [
		Google({
			authorization: { params: { access_type: "offline", prompt: "consent" } },
		}),
	],
	callbacks: {
		authorized: async ({ auth }) => {
			return !!auth;
		},

		jwt: async ({ token, account }) => {
			if (account) {
				return {
					...token,
					accessToken: account.access_token,
					idToken: account.id_token,
					refreshToken: account.refresh_token,
					provider: account.provider,
					expiresAt: account.expires_at,
				};
			} else if (
				token.expiresAt &&
				Date.now() < token.expiresAt * 1000 - EXPIRATION_BUFFER
			) {
				return token;
			} else {
				const response = await getRefreshToken(token.refreshToken!);
				return {
					...token,
					accessToken: response.access_token,
					idToken: response.id_token,
					expiresAt: Math.floor(Date.now() / 1000 + response.expires_in),
				};
			}
		},

		session: async ({ session, token }) => {
			session.accessToken = token.accessToken;
			session.idToken = token.idToken;
			session.refreshToken = token.refreshToken;
			session.provider = token.provider;

			return session;
		},
	},
});
