import {Box, CircularProgress} from "@mui/material";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {useApiWrapper} from "../../config/useApiWrapper";
import {StockPrice} from "../../domain/symbols/symbolTypes";
import {GET_STOCK_SYMBOL_PRICE, getStockSymbolPriceConfig} from "../../domain/symbols/symbolsApi";
import ErrorComponent from "../../error/ErrorComponent";
import SplitScreen from "../../components/SplitScreen";
import DetailBlock from "./leftpart/DetailBlock";
import {SymbolDetailsRightMenu} from "./rightpart/SymbolDetailsRightMenu";

const SymbolDetailsPage = () => {
    const {symbol} = useParams<{ symbol: string }>();
    const {apiGet} = useApiWrapper();

    const {error, isError, isPending, data: price} =
        useQuery<StockPrice>({
            queryKey: [GET_STOCK_SYMBOL_PRICE, symbol],
            queryFn: () => apiGet(getStockSymbolPriceConfig(symbol as string)),
        });

    if (isPending) return <CircularProgress/>;

    if (isError) return <ErrorComponent errorMessage={error.message}/>;

    return (
        <Box>
            <SplitScreen
                left={<DetailBlock stockPrice={price} symbol={symbol!}/>}
                right={<SymbolDetailsRightMenu stockPrice={price}/>}
                leftWeight={1}
                rightWeight={1}
            />
        </Box>
    )
}

export default SymbolDetailsPage;