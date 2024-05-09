import {useQuery} from "@tanstack/react-query";
import {useApiWrapper} from "../../config/useApiWrapper";
import {Box, CircularProgress} from "@mui/material";
import InvestmentSymbol from "../../investment/InvestmentSymbol";
import {InvestmentOrderForm} from "../../investmentorder/InvestmentOrderForm";
import ErrorComponent from "../../error/ErrorComponent";
import {InvestmentOrdersSymbol} from "../../investmentorder/symbol/InvestmentOrdersSymbol";
import {CompleteParticipant} from "../../participant/participantTypes";
import {GET_PARTICIPANTS_SYMBOL, getRunningParticipantsSymbol} from "../../participant/api/participantApi";
import {StockPrice} from "../../domain/symbols/symbolTypes";

interface Props {
    stockPrice: StockPrice
    isLargeWidth: boolean
}

export const SymbolDetailsRightMenu = (props: Props) => {
    const {stockPrice} = props
    const {apiGet} = useApiWrapper();

    const {isPending, isError, error, data} = useQuery<CompleteParticipant[]>({
        queryKey: [GET_PARTICIPANTS_SYMBOL],
        queryFn: () => apiGet(getRunningParticipantsSymbol(stockPrice.symbol)),
    });

    if (isPending) return <CircularProgress/>;

    if (isError) return <ErrorComponent errorMessage={error.message}/>;

    return (
        <Box id="symbolDetailsRighMenu" display="flex" flexDirection="column"
             sx={{width: props.isLargeWidth ? "30%" : "70%", padding: "50px 30px", margin: "auto"}}>
            <InvestmentSymbol participants={data} symbol={stockPrice.symbol}/>
            <InvestmentOrderForm participants={data} symbol={stockPrice.symbol} stockPrice={stockPrice}/>
            <InvestmentOrdersSymbol participants={data} symbol={stockPrice.symbol}/>
        </Box>
    );
}