import {Box, CircularProgress} from "@mui/material";
import {Contest, CONTEST_STATUS} from "../../contests/contestTypes";
import {useApiWrapper} from "../../config/apiWrapper";
import {useQuery} from "@tanstack/react-query";
import {InvestmentTotal} from "./InvestmentTotal";
import {ActiveContestList} from "../../contests/ActiveContestList";
import {GET_ACTIVE_CONTESTS, getActiveContestsConfig} from "../../contests/api/contestApi";
import {InvestmentOrdersTotal} from "../../investmentorder/total/InvestmentOrdersTotal";
import ErrorComponent from "../../error/ErrorComponent";


export const TrendingSymbolsRightMenu = () => {

    const {apiGet} = useApiWrapper();

    const {isLoading, error, data} = useQuery(
        [GET_ACTIVE_CONTESTS],
        () => apiGet(getActiveContestsConfig(
            [CONTEST_STATUS.AWAITING_START, CONTEST_STATUS.RUNNING, CONTEST_STATUS.STOPPED]))
    );

    if (error) return <ErrorComponent errorMessage={error as string}/>

    if (isLoading) return <CircularProgress/>

    const contests = data.map((contest: Contest) => new Contest(contest));

    if (contests && contests.length > 0) {
        return (
            <Box minWidth="300px">
                <ActiveContestList contests={contests}/>
                <InvestmentTotal/>
                <InvestmentOrdersTotal/>
            </Box>
        );
    } else {
        return (
            <></>
        );
    }
}