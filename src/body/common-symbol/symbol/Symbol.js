import React, {useContext, useEffect, useState} from "react";
import {SymbolContext} from "../../../context/SymbolContext";
import DetailBlock from "./details/DetailBlock";
import SymbolRightMenu from "./right-menu/SymbolRightMenu";
import "./symbol.css";
import {getRealTimePrice} from "../../../service/symbolService";
import {Box, CircularProgress} from "@mui/material";
import SearchField from "../search/SearchField";

const Symbol = () => {

    const {selectedSymbol} = useContext(SymbolContext);

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
            <Box id="symbolBody" sx={{mt:"3%", display:"flex", flexFlow:"row nowrap"}}>
                <DetailBlock symbol={selectedSymbol} currentPrice={currentPrice}/>
                <SymbolRightMenu symbol={selectedSymbol} currentPrice={currentPrice}/>
            </Box>
        </div>
    );
}

export default Symbol;