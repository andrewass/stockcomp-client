import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		accessToken?: string;
		idToken?: string;
		refreshToken?: string;
		provider?: string;
		userMode?: UserMode;
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
