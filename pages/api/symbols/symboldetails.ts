import {NextApiRequest, NextApiResponse} from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse){
    console.log("Inside handler for symbol details")
    res.status(200).json({name: "John Doe"})
}