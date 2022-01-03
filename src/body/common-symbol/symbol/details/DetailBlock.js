import React from "react";
import PriceChart from "./PriceChart";
import SymbolPresentation from "./SymbolPresentation";
import {Box} from "@mui/material";
import SymbolStats from "./SymbolStats";

const DetailBlock = ({symbolAndPrice, isLargeWidth}) => {

    return (
        <Box id="detailBlock" display="flex" flexDirection="column" alignItems="center"
             sx={{width: isLargeWidth ? "80%" : "100%", margin:"5% 5%"}}>
            <Box id="symbolData">
                <SymbolPresentation symbolAndPrice={symbolAndPrice}/>
                <SymbolStats symbolAndPrice={symbolAndPrice}/>
            </Box>
            <PriceChart symbolAndPrice={symbolAndPrice}/>
        </Box>
    );
}

export default DetailBlock;
