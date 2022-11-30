import {getToken} from "next-auth/jwt";

export { default } from "next-auth/middleware"


export async function middleware(req) {
    const {accessToken} = await getToken({req})
    console.log("A-T is "+accessToken)
}