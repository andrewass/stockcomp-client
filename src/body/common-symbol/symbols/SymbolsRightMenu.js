import {Box, CircularProgress} from "@mui/material";
import {getContests} from "../../../service/contestService";
import {PortfolioStatus} from "./PortfolioStatus";
import OrderTotal from "./OrderTotal";
import {InvestmentTotal} from "../investment/InvestmentTotal";
import {useQuery} from "react-query";
import {CONTEST_STATUS} from "../../../util/constants";
import {getParticipant} from "../../../service/participantService";
import {ActiveContest} from "./contest/ActiveContest";


export const SymbolsRightMenu = () => {

    const fetchActiveContest = async () => {
        const contests = await getContests(
            [CONTEST_STATUS.AWAITING_START, CONTEST_STATUS.RUNNING, CONTEST_STATUS.STOPPED]
        );
        return contests.find(contest => contest !== undefined)
    }

    const fetchParticipant = async () => {
        return await getParticipant(contest.contestNumber);
    }

    const {isLoading: loadingContest, error: contestError, data: contest} =
        useQuery("getActiveContest", fetchActiveContest);

    const {isLoading: loadingParticipant, error: participantError, data: participant} =
        useQuery("getParticipant", fetchParticipant, {enabled: !!contest,})

    if (loadingContest || loadingParticipant) return <CircularProgress/>

    if (contestError || participantError) return `Error! ${contestError ? contestError : participantError}`;

    const getParticipantData = () => {
        if (participant) {
            return (
                <>
                    <PortfolioStatus contest={contest} participant={participant}/>
                    <OrderTotal contest={contest} participant={participant}/>
                    <InvestmentTotal contest={contest} participant={participant}/>
                </>
            )
        }
    }

    return (
        <Box className="rightMenu" id="symbolsRightMenu" sx={{width: "30%"}}>
            <ActiveContest contest={contest} participant={participant}/>
            {getParticipantData()}
        </Box>
    );
}