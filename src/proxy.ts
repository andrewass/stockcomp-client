import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth.ts";

export default async function proxy(request: NextRequest) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});
	if (!session) {
		const returnTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;
		const signInUrl = new URL("/signin", request.url);
		signInUrl.searchParams.set("returnTo", returnTo);

		return NextResponse.redirect(signInUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		// Protect everything except auth entrypoints and static assets.
		"/((?!api/auth|signin|_next/static|_next/image|favicon.ico|.*\\..*).*)",
	],
};
