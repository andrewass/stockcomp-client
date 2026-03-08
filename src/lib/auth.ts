import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
	database: new Database("./sqlite.db"),
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			accessType: "offline",
			prompt: "select_account consent",
		},
	},
	user: {
		additionalFields: {
			role: {
				type: ["user", "admin"],
				required: false,
				input: false,
			},
		},
	},
});
