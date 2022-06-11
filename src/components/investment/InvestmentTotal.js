import InvestmentList from "./InvestmentList";
import {getAllInvestments} from "../../body/common-symbol/investment/client/investmentClient";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";


export const InvestmentTotal = ({contest}) => {

    const fetchAllInvestments = async () => {
        return await getAllInvestments(contest.contestNumber);
    }

    const {isLoading, error, data: investments} = useQuery("getAllInvestments", fetchAllInvestments);

    if (isLoading) return <CircularProgress/>

    if (error) return `Error! ${error}`;

    return <InvestmentList investments={investments}/>
}