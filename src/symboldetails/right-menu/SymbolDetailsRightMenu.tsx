import {useQuery} from "@tanstack/react-query";
import {useApiWrapper} from "../../config/useApiWrapper";
import {Box, CircularProgress} from "@mui/material";
import InvestmentSymbol from "../../investment/InvestmentSymbol";
import {InvestmentOrderForm} from "../../investmentorder/InvestmentOrderForm";
import ErrorComponent from "../../error/ErrorComponent";
import {InvestmentOrdersSymbol} from "../../investmentorder/symbol/InvestmentOrdersSymbol";
import {CompleteParticipant} from "../../participant/participantTypes";
import {StockPrice} from "../../stock/stockTypes";
import {GET_PARTICIPANTS_SYMBOL, getRunningParticipantsSymbol} from "../../participant/api/participantApi";

interface Props{
    stockPrice: StockPrice
    isLargeWidth: boolean
}

export const SymbolDetailsRightMenu = (props: Props) => {
    const {stockPrice} = props
    const {apiGet} = useApiWrapper();

    const {isLoading, error, data: participants} = useQuery<CompleteParticipant[]>(
        [GET_PARTICIPANTS_SYMBOL],
        () => apiGet(getRunningParticipantsSymbol(stockPrice.symbol)));

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    if (participants) {
        return (
            <Box id="symbolDetailsRighMenu" display="flex" flexDirection="column"
                 sx={{width: props.isLargeWidth ? "30%" : "70%", padding: "50px 30px", margin: "auto"}}>
                <InvestmentSymbol participants={participants} symbol={stockPrice.symbol}/>
                <InvestmentOrderForm participants={participants} symbol={stockPrice.symbol} stockPrice={stockPrice}/>
                <InvestmentOrdersSymbol participants={participants} symbol={stockPrice.symbol}/>
            </Box>
        );
    }
    return <></>;
}