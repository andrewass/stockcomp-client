import Head from "next/head";
import "../styles/global.css";

export default function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="theme-color" content="#000000"/>
                <meta name="description" content="Web site created using next"/>
            </Head>
            <Component {...pageProps} />
        </div>
    )
}