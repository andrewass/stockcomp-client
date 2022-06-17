import {Card, CardContent, Typography} from "@mui/material";
import {StockDetails} from "../../types/symbol";

interface Props {
    symbolInformation: StockDetails
}

const SymbolStats = ({symbolInformation}: Props) => {

    const {stockQuote, symbol, description} = symbolInformation
    const {currency, percentageChange, price, usdPrice, priceChange} = stockQuote

    const getCurrentPrice = () => {
        if (currency === "USD") {
            return <Typography display="inline">
                {price} {currency}
            </Typography>;
        } else {
            return <Typography display="inline">
                {price} {currency} (USD {usdPrice})
            </Typography>;
        }
    }

    return (
        <Card elevation={0}>
            <CardContent>
                <Typography variant="h5">
                    {description} ({symbol})
                </Typography>
                <Typography>
                    {getCurrentPrice()}
                </Typography>
                <Typography
                    sx={{color: priceChange >= 0 ? "limegreen" : "red"}}>{priceChange.toFixed(2)}
                </Typography>
                <Typography
                    sx={{color: priceChange >= 0 ? "limegreen" : "red"}}>{percentageChange.toFixed(2)}%
                </Typography>
            </CardContent>
        </Card>
    )
}

export default SymbolStats;