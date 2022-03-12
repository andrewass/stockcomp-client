import {OrderSymbol} from "./OrderSymbol";
import InvestmentSymbol from "./InvestmentSymbol";
import {getContestParticipants} from "../../../../service/contestService";
import {Box, CircularProgress} from "@mui/material";
import {useQuery} from "react-query";
import {CONTEST_STATUS} from "../../../../util/constants";

export const SymbolRightMenu = ({symbol, stockQuote, isLargeWidth}) => {

    const getActiveContestParticipant = (contestParticipants) => {
        return contestParticipants.find(contestParticipant => contestParticipant.participant);
    }

    const fetchActiveContestParticipants = async () => {
        const contestParticipants = await getContestParticipants([CONTEST_STATUS.RUNNING, CONTEST_STATUS.STOPPED]);
        return getActiveContestParticipant(contestParticipants);
    }

    const {isLoading, error, data: contestParticipant} =
        useQuery("getContestParticipantsSymbol", fetchActiveContestParticipants);

    if (isLoading) return <CircularProgress/>

    if (error) return `Error! ${error}`;

    if (contestParticipant) {
        const {contest, participant} = contestParticipant
        return (
            <Box id="symbolRightMenu" display="flex" flexDirection="column"
                 sx={{width: isLargeWidth ? "30%" : "70%", ml: "2rem"}}>
                <InvestmentSymbol contest={contest} participant={participant} symbol={symbol}/>
                <OrderSymbol contest={contest} symbol={symbol} stockQuote={stockQuote}/>
            </Box>
        );
    }
    return null;
}