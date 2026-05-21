"use client";

import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client.ts";

interface SearchParamsLike {
	get(name: string): string | null;
}

function getReturnTo(searchParams: SearchParamsLike): string {
	const returnTo = searchParams.get("returnTo");
	if (!returnTo?.startsWith("/") || returnTo.startsWith("//")) {
		return "/";
	}

	if (returnTo.startsWith("/signin")) {
		return "/";
	}

	return returnTo;
}

export default function SignInButton() {
	const searchParams = useSearchParams();
	const callbackURL = getReturnTo(searchParams);

	return (
		<button
			type="button"
			onClick={() =>
				authClient.signIn.social({ provider: "google", callbackURL })
			}
		>
			Sign in with Google
		</button>
	);
}
