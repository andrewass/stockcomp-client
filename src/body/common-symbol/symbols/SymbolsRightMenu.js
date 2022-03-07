import {Box, CircularProgress} from "@mui/material";
import {ActiveContests} from "./contest/ActiveContests";
import {getContestParticipantsByStatus} from "../../../service/contestService";
import {PortfolioStatus} from "./PortfolioStatus";
import OrderTotal from "./OrderTotal";
import {InvestmentTotal} from "./InvestmentTotal";
import {useQuery} from "react-query";
import {CONTEST_STATUS} from "../../../service/constants";


export const SymbolsRightMenu = () => {

    const getRunningContestsWithUserParticipation = (contests) => {
        return contests.find(contest => contest.participant);
    }

    const fetchActiveContestParticipants = async () => {
        const response = await getContestParticipantsByStatus(
            [CONTEST_STATUS.AWAITING_START, CONTEST_STATUS.RUNNING, CONTEST_STATUS.STOPPED]
        );
        return response.data.data.contestParticipants;
    }

    const getParticipantData = (contests) => {
        const runningContest = getRunningContestsWithUserParticipation(contests);
        if (runningContest) {
            return (
                <>
                    <PortfolioStatus contest={runningContest}/>
                    <OrderTotal contest={runningContest}/>
                    <InvestmentTotal contest={runningContest}/>
                </>
            )
        }
    }

    const {isLoading, error, data: contests} = useQuery("getActiveContestParticipants", fetchActiveContestParticipants);

    if (isLoading) return <CircularProgress/>

    if (error) return `Error! ${error}`;

    return (
        <Box className="rightMenu" id="symbolsRightMenu" sx={{width: "30%"}}>
            <ActiveContests contests={contests}/>
            {getParticipantData(contests)}
        </Box>
    );
}