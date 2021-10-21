import React from "react";
import PriceChart from "./PriceChart";
import SymbolPresentation from "../../SymbolPresentation";
import {Box} from "@mui/material";

const DetailBlock = ({symbol, currentPrice, isLargeWidth}) => {

    return (
        <Box id="detailBlock" display="flex" flexDirection="column" alignItems="center"
             sx={{width: isLargeWidth ? "80%" : "100%", margin:"5% 5%"}}>
            <Box id="symbolData">
                <SymbolPresentation symbol={currentPrice}/>
            </Box>
            <PriceChart symbol={symbol}/>
        </Box>
    );
}

export default DetailBlock;
