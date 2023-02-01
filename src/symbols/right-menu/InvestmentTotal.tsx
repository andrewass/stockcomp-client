import {useApiWrapper} from "../../config/apiWrapper";
import {useQuery} from "react-query";
import {GET_ALL_ACTIVE_INVESTMENTS, getAllInvestmentsConfig} from "../../investment/api/investmentApi";
import {CircularProgress} from "@mui/material";
import ErrorComponent from "../../components/common/ErrorComponent";
import InvestmentList from "./InvestmentList";


export const InvestmentTotal = () => {
    const {apiGet} = useApiWrapper();

    const {isLoading, error, data: investments} = useQuery(GET_ALL_ACTIVE_INVESTMENTS,
        () => apiGet(getAllInvestmentsConfig()));

    if (isLoading) return <CircularProgress/>;

    if (error) return <ErrorComponent errorMessage={error as string}/>;

    return <InvestmentList investments={investments}/>;
}