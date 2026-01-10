import {NextRequest, NextResponse} from "next/server";
import {auth} from "../../../../auth.ts";
import {Session} from "next-auth";

const BACKEND_BASE_URL = process.env.RESOURCE_SERVER_BASE_URL;


async function proxy(req: NextRequest) {
    const session = await auth();
    if(!session) {
        return NextResponse.json({error: "No active session"}, {status: 401});
    }
    const path = req.nextUrl.pathname.replace("/api/proxy","");
    const url = `${BACKEND_BASE_URL}${path}${req.nextUrl.search}`;
    const accessToken = extractAccessToken(session);

    const body =
        req.method === "GET"
            ? undefined
            : await req.text();


    const response = await fetch(url, {
        method: req.method,
        headers: {
            ...req.headers,
            Authorization: `Bearer ${accessToken}`,
        },
        body,
    });

    return new NextResponse(response.body, {
        status: response.status,
        headers: response.headers,
    });
}

function extractAccessToken(session: Session): string {
    if(session.provider === "google" && session.idToken) {
        return session.idToken;
    } else {
        throw new Error("Error extracting access token");
    }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const OPTIONS = proxy;
