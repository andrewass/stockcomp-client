import {unstable_getServerSession} from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]"
import {getToken} from "next-auth/jwt";


export default function Account(){

    return (
        <p>Account</p>
    )
}

export async function getServerSideProps({req, res}){
    const {user} = await unstable_getServerSession(req, res, authOptions)

    const token = await getToken({req})
    const bearerToken = token.accessToken

    const response = await fetch(process.env.STOCK_CONTEST_BASE_URL+"/get-details?email="+user.email, {
        method: 'GET'
    })

    const myProps = {
        isAuth: false,
        categories: "hello"
    }
    return { props: myProps }
};