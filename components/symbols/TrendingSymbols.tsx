import {Box, CircularProgress, Grid, useMediaQuery} from "@mui/material";
import SymbolCard from "./SymbolCard";
import {useQuery} from "react-query";
import SearchField from "../search/SearchField";
import {TrendingSymbolsRightMenu} from "./TrendingSymbolsRightMenu";
import {useTheme} from "@mui/material/styles";
import {Stock} from "../../src/types/symbol";
import {getTrendingStocks} from "../../src/api/symbolClient";
import {FETCH_QUOTE_INTERVAL} from "../../src/util/constants";
import ErrorComponent from "../../src/components/common/ErrorComponent";
import {useState} from "react";


const TrendingSymbols = () => {
    const theme = useTheme()
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"))
    const [symbols, setSymbols] = useState([])

    const fetchTrendingSymbols = (): Promise<Stock[]> => {
        return getTrendingStocks()
    }


    return (
        <Box>
            <SearchField/>
            <Box sx={{
                m: "3% 5%", display: "flex", alignItems: "flex-start",
                flexFlow: isLargeWidth ? "row nowrap" : "column nowrap"
            }}>
                <Grid container rowSpacing={1} columnSpacing={1}>
                    {symbols.map((symbol) =>
                        <Grid key={symbol} item md={6} sm={12}>
                            <SymbolCard stock={symbol}/>
                        </Grid>
                    )}
                </Grid>
                <TrendingSymbolsRightMenu/>
            </Box>
        </Box>
    )
}

export default TrendingSymbols