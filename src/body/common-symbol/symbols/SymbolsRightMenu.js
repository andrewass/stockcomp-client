import {Box, CircularProgress} from "@mui/material";
import {ActiveContests} from "./contest/ActiveContests";
import {getContestParticipants} from "../../../service/contestService";
import {PortfolioStatus} from "./PortfolioStatus";
import OrderTotal from "./OrderTotal";
import {InvestmentTotal} from "./InvestmentTotal";
import {useQuery} from "react-query";
import {CONTEST_STATUS} from "../../../util/constants";


export const SymbolsRightMenu = () => {

    const getRunningContestsWithUserParticipation = (contests) => {
        return contests.find(contest => contest.participant);
    }

    const fetchActiveContestParticipants = async () => {
        const response = await getContestParticipants(
            [CONTEST_STATUS.AWAITING_START, CONTEST_STATUS.RUNNING, CONTEST_STATUS.STOPPED]
        );
        return response.data.data.contestParticipants;
    }

    const getParticipantData = (contests) => {
        const contestParticipant = getRunningContestsWithUserParticipation(contests);
        if (contestParticipant) {
            let {contest, participant} = contestParticipant
            return (
                <>
                    <PortfolioStatus contest={contest} participant={participant}/>
                    <OrderTotal contest={contest} participant={participant}/>
                    <InvestmentTotal contest={contest} participant={participant}/>
                </>
            )
        }
    }

    const {isLoading, error, data: contests} = useQuery("getContestParticipantsSymbols", fetchActiveContestParticipants);

    if (isLoading) return <CircularProgress/>

    if (error) return `Error! ${error}`;

    return (
        <Box className="rightMenu" id="symbolsRightMenu" sx={{width: "30%"}}>
            <ActiveContests contests={contests}/>
            {getParticipantData(contests)}
        </Box>
    );
}