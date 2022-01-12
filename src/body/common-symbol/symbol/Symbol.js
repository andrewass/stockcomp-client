import React, {useContext} from "react";
import {SymbolContext} from "../../../config/SymbolContext";
import DetailBlock from "./details/DetailBlock";
import SymbolRightMenu from "./right-menu/SymbolRightMenu";
import {Box, CircularProgress, useMediaQuery} from "@mui/material";
import SearchField from "../search/SearchField";
import {useTheme} from "@mui/material/styles";
import {useQuery} from "@apollo/client";
import {GET_STOCK_STATS} from "../../../service/graphqlService";

const Symbol = () => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
    const {selectedSymbol} = useContext(SymbolContext);
    const {symbol} = selectedSymbol;

    const {loading, error, data} = useQuery(GET_STOCK_STATS, {variables: {symbol}});

    if (loading) return <CircularProgress/>;

    if (error) return `Error! ${error}`;

    const stockQuote = data.stockSymbolStats.stockQuote;
    const stockStats = data.stockSymbolStats.stockStats;

    return (
        <div id="symbolPage">
            <SearchField/>
            <Box id="symbolBody"
                 sx={{
                     mt: "3%", display: "flex", justifyContent: "center", alignItems: "center",
                     flexFlow: isLargeWidth ? "row nowrap" : "column nowrap"
                 }}>
                <DetailBlock isLargeWidth={isLargeWidth} symbol={selectedSymbol} stockQuote={stockQuote}
                             stockStats={stockStats}/>
                <SymbolRightMenu symbol={selectedSymbol} stockQuote={stockQuote} isLargeWidth={isLargeWidth}/>
            </Box>
        </div>
    );
}

export default Symbol;