import {getToken} from "next-auth/jwt";

export { default } from "next-auth/middleware"


export async function middleware(req) {
    const response = await getToken({req})
    if(response){
        const bearerToken = response.accessToken
    }
}