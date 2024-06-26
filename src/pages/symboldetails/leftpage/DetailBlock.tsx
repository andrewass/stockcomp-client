import {PriceChart} from "./PriceChart";
import SymbolStats from "./SymbolStats";
import {Box, CircularProgress, useMediaQuery} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {StockFinancials, StockPrice} from "../../../domain/symbols/symbolTypes";
import {useApiWrapper} from "../../../config/useApiWrapper";
import {GET_STOCK_SYMBOL_FINANCIALS, getStockSymbolFinancialsConfig} from "../../../domain/symbols/symbolsApi";
import ErrorComponent from "../../../error/ErrorComponent";
import {useTheme} from "@mui/material/styles";

interface Props {
    stockPrice: StockPrice,
    symbol: string
}

const DetailBlock = (props: Props) => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
    const {apiGet} = useApiWrapper();

    const {error, isError, isPending, data} =
        useQuery<StockFinancials>({
            queryKey: [GET_STOCK_SYMBOL_FINANCIALS, props.symbol],
            queryFn: () => apiGet(getStockSymbolFinancialsConfig(props.symbol as string)),
        });

    if (isPending) return <CircularProgress/>;

    if (isError) return <ErrorComponent errorMessage={error.message}/>;

    return (
        <Box id="detailBlock" display="flex" flexDirection="column" alignItems="center"
             sx={{width: isLargeWidth ? "80%" : "100%"}}>
            <SymbolStats stockFinancials={data} stockPrice={props.stockPrice}/>
            <PriceChart symbol={props.symbol}/>
        </Box>
    );
}

export default DetailBlock;
