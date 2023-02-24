import {useQuery} from "react-query";
import {useApiWrapper} from "../../config/apiWrapper";
import {Stock} from "../symbolDetailTypes";
import {GET_ACTIVE_PARTICIPANT, getActiveParticipantConfig} from "../api/symbolDetailsApi";
import {Box, CircularProgress} from "@mui/material";
import InvestmentSymbol from "../../investment/InvestmentSymbol";
import {InvestmentOrderForm} from "../../investmentorder/InvestmentOrderForm";
import ErrorComponent from "../../error/ErrorComponent";
import {InvestmentOrdersSymbol} from "../../investmentorder/symbol/InvestmentOrdersSymbol";
import {Participant} from "../../participant/participantTypes";

interface Props {
    stock: Stock
    isLargeWidth: boolean
}

export const SymbolDetailsRightMenu = ({stock, isLargeWidth}: Props) => {
    const {apiGet} = useApiWrapper();

    const {isLoading, error, data: participant} = useQuery<Participant>(GET_ACTIVE_PARTICIPANT,
        () => apiGet(getActiveParticipantConfig()));

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    if (participant) {
        return (
            <Box display="flex" flexDirection="column" sx={{width: isLargeWidth ? "30%" : "70%", ml: "2rem"}}>
                <InvestmentSymbol participant={participant} symbol={stock.symbol}/>
                <InvestmentOrderForm symbol={stock.symbol}
                                     contestNumber={participant.contestNumber} stockQuote={stock.stockQuote}/>
                <InvestmentOrdersSymbol contestNumber={participant.contestNumber}
                                        stockQuote={stock.stockQuote} symbol={stock.symbol}/>
            </Box>
        );
    }
    return <></>;
}