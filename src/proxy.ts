import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { apiGet } from "@/api/apiWrapper.ts";
import { auth } from "@/auth.ts";

export default async function proxy(request: NextRequest) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) return NextResponse.redirect(new URL("/signin", request.url));

	if (request.nextUrl.pathname.startsWith("/admin")) {
		const hasAdminRole = await apiGet<boolean>({ url: "/users/admin" });
		if (!hasAdminRole) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/leaderboard/:path*", "/admin/:path*"],
};
