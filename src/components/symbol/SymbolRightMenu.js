import {InvestmentOrdersSymbol} from "../investmentorder/InvestmentOrdersSymbol";
import InvestmentSymbol from "../investment/InvestmentSymbol";
import {getContests} from "../../api/contestClient";
import {Box, CircularProgress} from "@mui/material";
import {useQuery} from "react-query";
import {CONTEST_STATUS} from "../../util/constants";
import {getParticipant} from "../../service/participantService";

export const SymbolRightMenu = ({symbol, stockQuote, isLargeWidth}) => {

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
        useQuery("getActiveContestSymbol", fetchActiveContest);

    const {isLoading: loadingParticipant, error: participantError, data: participant} =
        useQuery("getParticipantSymbol", fetchParticipant, {enabled: !!contest})

    if (loadingContest || loadingParticipant) return <CircularProgress/>

    if (contestError || participantError) return `Error! ${contestError ? contestError : participantError}`;

    if (participant) {
        return (
            <Box id="symbolRightMenu" display="flex" flexDirection="column"
                 sx={{width: isLargeWidth ? "30%" : "70%", ml: "2rem"}}>
                <InvestmentSymbol contest={contest} participant={participant} symbol={symbol}/>
                <InvestmentOrdersSymbol contest={contest} symbol={symbol} stockQuote={stockQuote}/>
            </Box>
        );
    }
    return null;
}