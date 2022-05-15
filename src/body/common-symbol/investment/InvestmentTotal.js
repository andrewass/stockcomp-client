import Investments from "./Investments";
import {getAllInvestments} from "./client/investmentService";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";


export const InvestmentTotal = ({contest}) => {

    const fetchAllInvestments = async () => {
        return await getAllInvestments(contest.contestNumber);
    }

    const {isLoading, error, data: investments} = useQuery("getAllInvestments", fetchAllInvestments);

    if (isLoading) return <CircularProgress/>

    if (error) return `Error! ${error}`;

    return <Investments investments={investments}/>
}