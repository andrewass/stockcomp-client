import {signIn, signOut, useSession} from "next-auth/react";


export default function HomePage() {

    const {data: session, status} = useSession()

    if (session) {
        return (
            <>
                Signed in as user session {JSON.stringify(session)}<br/>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br/>
            <button onClick={() => signIn("custom-oauth2")}>
                Sign in
            </button>
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


export async function getServerSideProps() {
    //const res = await fetch(process.env.BASE_URL + "/api/symbols/trendingsymbols")
    const result = "value"
    return {props: {result}}
}