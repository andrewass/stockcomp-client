import {Box, CircularProgress, useMediaQuery} from "@mui/material";
import SearchField from "../components/search/SearchField";
import {useTheme} from "@mui/material/styles";
import {getStockSymbolInformation} from "../api/symbolClient";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import ErrorComponent from "../components/common/ErrorComponent";
import DetailBlock from "./details/DetailBlock";
import {SymbolDetailsRightMenu} from "./right-menu/SymbolDetailsRightMenu";

const SymbolDetails = () => {
    const theme = useTheme()
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"))
    const {symbol} = useParams<{symbol: string}>()

    const fetchStockSymbolInformation = () => {
        return getStockSymbolInformation(symbol!)
    }

    const {isLoading, data: symbolDetails, error} =
        useQuery("getStockSymbolInformation", fetchStockSymbolInformation)

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string} />

    const {stockQuote} = symbolDetails

    return (
        <>
            <SearchField/>
            <Box sx={{
                mt: "3%", display: "flex", justifyContent: "center",
                flexFlow: isLargeWidth ? "row nowrap" : "column nowrap"
            }}>
                <DetailBlock isLargeWidth={isLargeWidth} symbolDetails={symbolDetails}/>
                <SymbolDetailsRightMenu symbol={symbol} stockQuote={stockQuote} isLargeWidth={isLargeWidth}/>
            </Box>
        </>
    )
}

export default SymbolDetails