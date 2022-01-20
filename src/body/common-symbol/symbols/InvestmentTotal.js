import Investments from "../investment/Investments";
import {getAllInvestmentsForContest} from "../../../service/investmentService";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";


export const InvestmentTotal = ({contest}) => {

    const fetchAllInvestments = async () => {
        const response = await getAllInvestmentsForContest(contest.contestNumber);
        return response.data;
    }

    const {isLoading, error, data} = useQuery("getAllInvestments", fetchAllInvestments);

    if (isLoading) return <CircularProgress/>

    if (error) return `Error! ${error}`;

    return <Investments investments={data}/>
}