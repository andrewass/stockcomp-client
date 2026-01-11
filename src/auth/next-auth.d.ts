declare module "next-auth" {
	interface Session {
		accessToken?: string;
		idToken?: string;
		refreshToken?: string;
		provider?: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		accessToken?: string;
		idToken?: string;
		refreshToken?: string;
		provider?: string;
		expiresAt?: number;
	}
}
