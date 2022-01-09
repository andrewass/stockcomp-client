import React from "react";
import PriceChart from "./PriceChart";
import SymbolStats from "./SymbolStats";
import {Box} from "@mui/material";

const DetailBlock = ({symbolStats, isLargeWidth}) => {

    return (
        <Box id="detailBlock" display="flex" flexDirection="column" alignItems="center"
             sx={{width: isLargeWidth ? "80%" : "100%", margin:"5% 5%"}}>
            <Box id="symbolData">
                <SymbolStats symbol={symbolStats.symbol} symbolName={symbolStats.name}/>
            </Box>
            <PriceChart symbol={symbolStats.symbol}/>
        </Box>
    );
}

export default DetailBlock;
