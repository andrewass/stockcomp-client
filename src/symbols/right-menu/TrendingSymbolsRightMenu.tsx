import {Box} from "@mui/material";
import {CONTEST_STATUS} from "../../contests/contestTypes";
import {useApiWrapper} from "../../config/apiWrapper";
import {useQuery} from "react-query";
import {GET_ACTIVE_CONTESTS, getActiveContestsConfig} from "../api/symbolsApi";
import {ActiveContestList} from "./ActiveContestList";
import {InvestmentTotal} from "./InvestmentTotal";
import {InvestmentOrdersTotal} from "../../investmentorder/total/InvestmentOrdersTotal";
import {Contest} from "../../types/contest";


export const TrendingSymbolsRightMenu = () => {

    const {apiGet} = useApiWrapper();

    const {isLoading, error, data: contests} = useQuery<Contest[]>(GET_ACTIVE_CONTESTS,
        () => apiGet(getActiveContestsConfig(
            [CONTEST_STATUS.AWAITING_START, CONTEST_STATUS.RUNNING, CONTEST_STATUS.STOPPED]
        )));

    if (contests) {
        return (
            <Box>
                <ActiveContestList contests={contests}/>
                <InvestmentTotal />
                <InvestmentOrdersTotal />
            </Box>
        );
    } else {
        return (
            <Box>
                <p>No active contests</p>
            </Box>
        );
    }
}