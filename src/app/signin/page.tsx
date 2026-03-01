"use client";

import { authClient } from "@/auth-client.ts";

export default function SignInPage() {
	return (
		<button
			onClick={() =>
				authClient.signIn.social({ provider: "google", callbackURL: "/" })
			}
		>
			Sign in with Google
		</button>
	);
}
