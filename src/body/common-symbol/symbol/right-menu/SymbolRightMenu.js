import {OrderSymbol} from "./OrderSymbol";
import InvestmentSymbol from "./InvestmentSymbol";
import {getContestParticipants} from "../../../../service/contestService";
import {Box, CircularProgress} from "@mui/material";
import {useQuery} from "react-query";
import {CONTEST_STATUS} from "../../../../util/constants";

export const SymbolRightMenu = ({symbol, stockQuote, isLargeWidth}) => {

    const getActiveContestParticipant = ({contestParticipants}) => {
        return contestParticipants.find(contest => contest.participant);
    }

    const fetchActiveContestParticipants = async () => {
        let response = await getContestParticipants([CONTEST_STATUS.RUNNING, CONTEST_STATUS.STOPPED]);
        return getActiveContestParticipant(response.data.data);
    }

    const {isLoading, error, data : contestParticipant} =
        useQuery("getContestParticipantsSymbol", fetchActiveContestParticipants);

    if (isLoading) return <CircularProgress/>

    if (error) return `Error! ${error}`;

    if(contestParticipant){
        return (
            <Box id="symbolRightMenu" display="flex" flexDirection="column"
                 sx={{width: isLargeWidth ? "30%" :"70%", ml:"2rem"}}>
                <InvestmentSymbol contestParticipant={contestParticipant} symbol={symbol}/>
                <OrderSymbol contestParticipant={contestParticipant} symbol={symbol} stockQuote={stockQuote}/>
            </Box>
        );
    }
    return null;
}