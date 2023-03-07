import {Box} from "@mui/material";
import {Contest, CONTEST_STATUS} from "../../contests/contestTypes";
import {useApiWrapper} from "../../config/apiWrapper";
import {useQuery} from "react-query";
import {InvestmentTotal} from "./InvestmentTotal";
import {ActiveContestList} from "../../contests/ActiveContestList";
import {GET_ACTIVE_CONTESTS, getActiveContestsConfig} from "../../contests/api/contestApi";
import {InvestmentOrdersTotal} from "../../investmentorder/total/InvestmentOrdersTotal";


export const TrendingSymbolsRightMenu = () => {

    const {apiGet} = useApiWrapper();

    const {isLoading, error, data: contests} = useQuery<Contest[]>(GET_ACTIVE_CONTESTS,
        () => apiGet(getActiveContestsConfig(
            [CONTEST_STATUS.AWAITING_START, CONTEST_STATUS.RUNNING, CONTEST_STATUS.STOPPED]
        )));

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