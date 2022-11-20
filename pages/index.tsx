import Head from "next/head";
import TrendingSymbols from "../components/symbols/TrendingSymbols";
import {signIn, signOut, useSession} from "next-auth/react";


export default function HomePage() {

    const {data: session, status} = useSession()

    if (session) {
        return (
            <>
                Signed in as user <br/>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br/>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )

    /*
    return (
        <>
            <Head>
                <title>Stock Comp</title>
            </Head>
            <p>Hello</p>
            <TrendingSymbols/>
        </>
    )

     */
}


export async function getServerSideProps(){
    const res = await fetch(process.env.BASE_URL+"/api/symbols/trendingsymbols")
    console.log("RES is "+JSON.stringify(res))
    const result = "value"

    return {props: {result}}
}