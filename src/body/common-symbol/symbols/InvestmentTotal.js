import Investments from "../investment/Investments";
import {getInvestments} from "../../../service/investmentService";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";


export const InvestmentTotal = ({contest}) => {

    const fetchAllInvestments = async () => {
        return await getInvestments(contest.contestNumber);
    }

    const {isLoading, error, data: investments} = useQuery("getAllInvestments", fetchAllInvestments);

    if (isLoading) return <CircularProgress/>

    if (error) return `Error! ${error}`;

    return <Investments investments={investments}/>
}