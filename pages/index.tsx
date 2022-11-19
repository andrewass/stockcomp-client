import Head from "next/head";
import TrendingSymbols from "../components/symbols/TrendingSymbols";


export default function HomePage() {
    return (
        <>
            <Head>
                <title>Stock Comp</title>
            </Head>
            <p>Hello</p>
            <TrendingSymbols/>
        </>
    )
}


export async function getServerSideProps(){
    const res = await fetch(process.env.BASE_URL+"/api/symbols/trendingsymbols")
    console.log("RES is "+JSON.stringify(res))
    const result = "value"

    return {props: {result}}
}