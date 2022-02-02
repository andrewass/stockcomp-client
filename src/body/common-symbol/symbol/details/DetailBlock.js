import {PriceChart} from "./PriceChart";
import SymbolStats from "./SymbolStats";
import {Box} from "@mui/material";

const DetailBlock = ({isLargeWidth, symbol, stockQuote, stockStats}) => {

    return (
        <Box id="detailBlock" display="flex" flexDirection="column" alignItems="center"
             sx={{width: isLargeWidth ? "80%" : "100%", margin:"5% 5%"}}>
            <Box id="symbolData">
                <SymbolStats symbol={symbol} quote={stockQuote} stats={stockStats}/>
            </Box>
            <PriceChart symbol={symbol.symbol}/>
        </Box>
    );
}

export default DetailBlock;
