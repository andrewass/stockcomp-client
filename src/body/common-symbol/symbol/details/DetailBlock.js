import {PriceChart} from "./PriceChart";
import SymbolInformation from "./SymbolInformation";
import {Box} from "@mui/material";

const DetailBlock = ({isLargeWidth, symbolDetails}) => {

    return (
        <Box id="detailBlock" display="flex" flexDirection="column" alignItems="center"
             sx={{width: isLargeWidth ? "80%" : "100%", margin:"5% 5%"}}>
            <Box id="symbolData">
                <SymbolInformation symbolDetails={symbolDetails}/>
            </Box>
            <PriceChart symbol={symbolDetails.symbol}/>
        </Box>
    );
}

export default DetailBlock;
