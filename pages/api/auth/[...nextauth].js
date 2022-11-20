import NextAuth from "next-auth"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        {
            id: "custom-oauth2",
            name: "CustomOauth2",
            type: "oauth",
            version: "2.0",
            token: process.env.AUTH_SERVER_URL + "/token",
            authorization: process.env.AUTH_SERVER_URL + "/authorize",
            requestTokenUrl: "",
            userInfo: "",
            async profile(profile, tokens) {
                // You can use the tokens, in case you want to fetch more profile information
                // For example several OAuth providers do not return email by default.
                // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture
                }
            },
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        }
    ],
}

export default NextAuth(authOptions)