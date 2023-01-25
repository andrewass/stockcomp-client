import InvestmentList from "./InvestmentList";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";
import {Contest} from "../symboldetails/symbolDetailTypes";
import ErrorComponent from "../components/common/ErrorComponent";
import {GET_ALL_INVESTMENTS_FOR_CONTEST, getAllInvestmentsConfig} from "./api/investmentApi";
import {useApiWrapper} from "../config/apiWrapper";


interface Props {
    contest: Contest
}

export const InvestmentTotal = ({contest}: Props) => {

    const {apiGet} = useApiWrapper();
    const {contestNumber} = contest;

    const {isLoading, error, data: investments} = useQuery([GET_ALL_INVESTMENTS_FOR_CONTEST, contestNumber]
        , () => apiGet(getAllInvestmentsConfig(contestNumber)))

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    return <InvestmentList investments={investments}/>
}