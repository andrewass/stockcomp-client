import InvestmentList from "./InvestmentList";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";
import { Contest } from "../symboldetails/symbolDetailTypes";
import ErrorComponent from "../components/common/ErrorComponent";
import {getAllInvestments} from "../api/investmentClient";


interface Props{
    contest: Contest
}

export const InvestmentTotal = ({contest}: Props) => {

    const fetchAllInvestments = async () => {
        return await getAllInvestments(contest.contestNumber)
    }

    const {isLoading, error, data: investments} = useQuery("getAllInvestments", fetchAllInvestments)

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    return <InvestmentList investments={investments}/>
}