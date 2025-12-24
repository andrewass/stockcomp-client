import {NextRequest, NextResponse} from "next/server";

const BACKEND_BASE_URL = process.env.RESOURCE_SERVER_BASE_URL;


async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname.replace("/api/proxy","");
    const url = `${BACKEND_BASE_URL}${path}${req.nextUrl.search}`;

    const body =
        req.method === "GET"
            ? undefined
            : await req.text();


    const response = await fetch(url, {
        method: req.method,
        headers: req.headers,
        body,
    });

    return new NextResponse(response.body, {
        status: response.status,
        headers: response.headers,
    });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const OPTIONS = proxy;
