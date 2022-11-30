import {unstable_getServerSession} from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]"


export default function Account(){

    return (
        <p>Account</p>
    )
}

export async function getServerSideProps({req, res}){
    const session = await unstable_getServerSession(req, res, authOptions)

    const myProps = {
        isAuth: false,
        categories: "hello"
    }
    return { props: myProps }
};