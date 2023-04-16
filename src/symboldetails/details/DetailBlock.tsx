import {PriceChart} from "./PriceChart";
import SymbolStats from "./SymbolStats";
import {Box} from "@mui/material";
import {Stock} from "../../stock/stockTypes";


const DetailBlock = ({isLargeWidth, symbolDetails}: { isLargeWidth: Boolean, symbolDetails: Stock }) => {

    return (
        <Box id="detailBlock" display="flex" flexDirection="column" alignItems="center"
             sx={{width: isLargeWidth ? "80%" : "100%"}}>
            <SymbolStats symbolDetails={symbolDetails}/>
            <PriceChart symbol={symbolDetails.symbol}/>
        </Box>
    );
}

export default DetailBlock;
