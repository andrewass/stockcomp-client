import {useQuery} from "@tanstack/react-query";
import {useApiWrapper} from "../../config/apiWrapper";
import {GET_ACTIVE_PARTICIPANT, getActiveParticipantConfig} from "../api/symbolDetailsApi";
import {Box, CircularProgress} from "@mui/material";
import InvestmentSymbol from "../../investment/InvestmentSymbol";
import {InvestmentOrderForm} from "../../investmentorder/InvestmentOrderForm";
import ErrorComponent from "../../error/ErrorComponent";
import {InvestmentOrdersSymbol} from "../../investmentorder/symbol/InvestmentOrdersSymbol";
import {Participant} from "../../participant/participantTypes";
import {Stock} from "../../stock/stockTypes";


export const SymbolDetailsRightMenu = ({stock, isLargeWidth}: { stock: Stock, isLargeWidth: boolean }) => {
    const {apiGet} = useApiWrapper();

    const {isLoading, error, data: participant} = useQuery<Participant>(
        [GET_ACTIVE_PARTICIPANT],
        () => apiGet(getActiveParticipantConfig()));

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    if (participant) {
        return (
            <Box id="symbolDetailsRighMenu" display="flex" flexDirection="column"
                 sx={{width: isLargeWidth ? "30%" : "70%", padding: "50px 30px", margin: "auto"}}>
                <InvestmentSymbol participant={participant} symbol={stock.symbol}/>
                <InvestmentOrderForm symbol={stock.symbol}
                                     contestNumber={participant.contestNumber} stockQuote={stock.stockQuote}/>
                <InvestmentOrdersSymbol contestNumber={participant.contestNumber} symbol={stock.symbol}/>
            </Box>
        );
    }
    return <></>;
}