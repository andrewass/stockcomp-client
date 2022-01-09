import React, {useContext, useEffect, useState} from "react";
import {SymbolContext} from "../../../context/SymbolContext";
import DetailBlock from "./details/DetailBlock";
import SymbolRightMenu from "./right-menu/SymbolRightMenu";
import {getRealTimePrice} from "../../../service/symbolService";
import {Box, CircularProgress, useMediaQuery} from "@mui/material";
import SearchField from "../search/SearchField";
import {useTheme} from "@mui/material/styles";

const Symbol = () => {
    const theme = useTheme();
    const {selectedSymbol} = useContext(SymbolContext);
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));

    const [isLoading, setIsLoading] = useState(true);
    const [symbolStats, setSymbolStats] = useState();

    const getSymbolStats = async () => {
        setIsLoading(true);
        let response = await getRealTimePrice(selectedSymbol.symbol);
        setSymbolStats(response.data);
        setIsLoading(false);
    }

    useEffect(() => {
        getSymbolStats().catch(error => console.log(error));
    }, [selectedSymbol]);

    if (isLoading) {
        return <CircularProgress/>;
    }
    return (
        <div id="symbolPage">
            <SearchField/>
            <Box id="symbolBody"
                 sx={{mt: "3%", display: "flex", justifyContent:"center", alignItems:"center",
                 flexFlow: isLargeWidth ? "row nowrap" : "column nowrap"}}>
                <DetailBlock symbolStats={selectedSymbol} isLargeWidth={isLargeWidth}/>
                <SymbolRightMenu symbol={selectedSymbol} currentPrice={symbolStats} isLargeWidth={isLargeWidth}/>
            </Box>
        </div>
    );
}

export default Symbol;