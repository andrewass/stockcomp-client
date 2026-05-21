import { Suspense } from "react";
import SignInButton from "@/auth/SignInButton.tsx";

export default function SignInPage() {
	return (
		<Suspense fallback={<button type="button">Sign in with Google</button>}>
			<SignInButton />
		</Suspense>
	);
}
