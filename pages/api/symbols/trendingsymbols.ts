import {NextApiRequest, NextApiResponse} from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse){
    console.log("Inside handler : "+process.env.BASE_URL)
    res.status(200).json({name: "John Doe"})
}