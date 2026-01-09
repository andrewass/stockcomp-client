import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [Google],
    session: { strategy: "jwt" },
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth;
        },
        jwt: async ({ token, account }) => {
            if (account) {
                token.accessToken = account.access_token;
                token.idToken = account.id_token;
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.accessToken = token.accessToken;
            session.idToken = token.idToken;

            return session;
        }
    },
});
