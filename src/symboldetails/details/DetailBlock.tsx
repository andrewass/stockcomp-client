import {PriceChart} from "./PriceChart";
import SymbolStats from "./SymbolStats";
import {Box} from "@mui/material";
import {StockFinancials, StockPrice} from "../../stock/stockTypes";


const DetailBlock = ({isLargeWidth, stockFinancials, stockPrice}: {
    isLargeWidth: Boolean, stockFinancials: StockFinancials, stockPrice: StockPrice
}) => {

    return (
        <Box id="detailBlock" display="flex" flexDirection="column" alignItems="center"
             sx={{width: isLargeWidth ? "80%" : "100%"}}>
            <SymbolStats stockFinancials={stockFinancials} stockPrice={stockPrice}/>
            <PriceChart symbol={stockFinancials.symbol}/>
        </Box>
    );
}

export default DetailBlock;
