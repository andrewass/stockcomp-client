import {useApiWrapper} from "../../config/useApiWrapper";
import {useQuery} from "@tanstack/react-query";
import {GET_ALL_ACTIVE_INVESTMENTS, getAllInvestmentsConfig} from "../../investment/api/investmentApi";
import {CircularProgress} from "@mui/material";
import InvestmentList from "./InvestmentList";
import ErrorComponent from "../../error/ErrorComponent";
import {Investment} from "../../investment/investmentTypes";


export const InvestmentTotal = () => {
    const {apiGet} = useApiWrapper();

    const {isLoading, error, data: investments} = useQuery<Investment[]>(
        [GET_ALL_ACTIVE_INVESTMENTS],
        () => apiGet(getAllInvestmentsConfig())
    );

    if (isLoading) return <CircularProgress/>;

    if (error) return <ErrorComponent errorMessage={error as string}/>;

    if (investments && investments.length > 0) {
        return <InvestmentList investments={investments}/>
    } else {
        return <></>
    }
}