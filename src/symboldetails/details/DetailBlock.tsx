import {PriceChart} from "./PriceChart";
import SymbolStats from "./SymbolStats";
import {Box, CircularProgress} from "@mui/material";
import {StockFinancials, StockPrice} from "../../stock/stockTypes";
import {useQuery} from "@tanstack/react-query";
import {GET_STOCK_SYMBOL_FINANCIALS, getStockSymbolFinancialsConfig} from "../api/symbolDetailsApi";
import {useApiWrapper} from "../../config/useApiWrapper";
import ErrorComponent from "../../error/ErrorComponent";

interface Props{
    isLargeWidth: boolean,
    stockPrice: StockPrice,
    symbol: string
}

const DetailBlock = (props: Props) => {
    const {apiGet} = useApiWrapper();

    const {error: financialsError, isLoading: financialsLoading, data: stockFinancials} =
        useQuery<StockFinancials>(
            [GET_STOCK_SYMBOL_FINANCIALS, props.symbol],
            () => apiGet(getStockSymbolFinancialsConfig(props.symbol as string))
        );

    if (financialsLoading) return <CircularProgress/>;

    if (financialsError) return <ErrorComponent errorMessage={financialsError as string}/>;

    return (
        <Box id="detailBlock" display="flex" flexDirection="column" alignItems="center"
             sx={{width: props.isLargeWidth ? "80%" : "100%"}}>
            <SymbolStats stockFinancials={stockFinancials!} stockPrice={props.stockPrice}/>
            <PriceChart symbol={props.symbol}/>
        </Box>
    );
}

export default DetailBlock;
