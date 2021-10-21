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
    const [currentPrice, setCurrentPrice] = useState();

    const getCurrentPrice = async () => {
        setIsLoading(true);
        let response = await getRealTimePrice(selectedSymbol.symbol);
        setCurrentPrice(response.data);
        setIsLoading(false);
    }

    useEffect(() => {
        getCurrentPrice().catch(error => console.log(error));
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
                <DetailBlock symbol={selectedSymbol} currentPrice={currentPrice} isLargeWidth={isLargeWidth}/>
                <SymbolRightMenu symbol={selectedSymbol} currentPrice={currentPrice} isLargeWidth={isLargeWidth}/>
            </Box>
        </div>
    );
}

export default Symbol;