import React from "react";
import PriceChart from "./PriceChart";
import SymbolPresentation from "../../SymbolPresentation";
import {Box} from "@mui/material";

const DetailBlock = ({symbol, currentPrice}) => {

    return (
        <Box id="detailBlock" display="flex" flexDirection="column" sx={{width:"60%", marginRight:"5%"}}>
            <Box id="symbolData">
                <SymbolPresentation symbol={currentPrice}/>
            </Box>
            <PriceChart symbol={symbol}/>
        </Box>
    );
}

export default DetailBlock;
