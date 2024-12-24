import {useQuery} from "@tanstack/react-query";
import {Box, CircularProgress, useMediaQuery} from "@mui/material";
import {StockPrice} from "../../../domain/symbols/symbolTypes";
import {useApiWrapper} from "../../../config/useApiWrapper";
import ErrorComponent from "../../../error/ErrorComponent";
import InvestmentSymbol from "../../../investment/InvestmentSymbol";
import {InvestmentOrderForm} from "./InvestmentOrderForm";
import {InvestmentOrdersSymbol} from "./InvestmentOrdersSymbol";
import {useTheme} from "@mui/material/styles";
import {CompleteParticipant} from "../../../domain/participant/participantTypes";
import {
    GET_PARTICIPANTS_SYMBOL,
    getRunningParticipantsForSymbolConfig
} from "../../../domain/participant/participantApi";


interface Props {
    stockPrice: StockPrice
}

export const SymbolDetailsRightMenu = ({stockPrice}: Props) => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
    const {apiGet} = useApiWrapper();

    const {isPending, isError, error, data} = useQuery<CompleteParticipant[]>({
        queryKey: [GET_PARTICIPANTS_SYMBOL],
        queryFn: () => apiGet(getRunningParticipantsForSymbolConfig(stockPrice.symbol)),
    });

    if (isPending) return <CircularProgress/>;

    if (isError) return <ErrorComponent errorMessage={error.message}/>;

    return (
        <Box id="symbolDetailsRighMenu"
             display="flex"
             flexDirection="column"
             sx={{width: isLargeWidth ? "30%" : "70%", padding: "50px 30px", margin: "auto"}}
        >
            <InvestmentSymbol participants={data} symbol={stockPrice.symbol}/>
            <InvestmentOrderForm participants={data} symbol={stockPrice.symbol} stockPrice={stockPrice}/>
            <InvestmentOrdersSymbol participants={data} symbol={stockPrice.symbol}/>
        </Box>
    );
}
