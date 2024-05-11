import {useQuery} from "@tanstack/react-query";
import {Box, CircularProgress} from "@mui/material";
import {StockPrice} from "../../../domain/symbols/symbolTypes";
import {useApiWrapper} from "../../../config/useApiWrapper";
import {CompleteParticipant} from "../../../participant/participantTypes";
import {GET_PARTICIPANTS_SYMBOL, getRunningParticipantsSymbol} from "../../../participant/api/participantApi";
import ErrorComponent from "../../../error/ErrorComponent";
import InvestmentSymbol from "../../../investment/InvestmentSymbol";
import {InvestmentOrderForm} from "./InvestmentOrderForm";
import {InvestmentOrdersSymbol} from "./InvestmentOrdersSymbol";


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