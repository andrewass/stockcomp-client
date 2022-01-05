import React from "react";
import PriceChart from "./PriceChart";
import SymbolStats from "./SymbolStats";
import {Box} from "@mui/material";

const DetailBlock = ({symbol, isLargeWidth}) => {

    return (
        <Box id="detailBlock" display="flex" flexDirection="column" alignItems="center"
             sx={{width: isLargeWidth ? "80%" : "100%", margin:"5% 5%"}}>
            <Box id="symbolData">
                <SymbolStats symbol={symbol}/>
            </Box>
            <PriceChart symbol={symbol}/>
        </Box>
    );
}

export default DetailBlock;
