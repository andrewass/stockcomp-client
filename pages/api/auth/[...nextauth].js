import NextAuth from "next-auth"

export const authOptions = {
    providers: [
        {
            id: "custom-oauth2",
            name: "CustomOauth2",
            type: "oauth",
            version: "2.0",
            idToken: true,
            wellKnown: process.env.AUTH_SERVER_URL + "/.well-known/openid-configuration",
            requestTokenUrl: "",
            params: {grant_type: "authorization_code"},
            userInfo: process.env.AUTH_SERVER_URL + "/user/info",
            async profile(profile, tokens) {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture
                }
            },
            issuer: process.env.AUTH_SERVER_URL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        }
    ],
    callbacks: {
        async jwt({token, account, profile}) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                token.id = profile.id
            }
            return token
        }
    }
}

export default NextAuth(authOptions)