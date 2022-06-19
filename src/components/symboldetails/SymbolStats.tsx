import {Box, Card, CardContent, Typography} from "@mui/material";
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
                <Box>
                    <Typography variant="h5">
                        {description} ({symbol})
                    </Typography>

                    {getCurrentPrice()}

                    <Typography
                        sx={{color: priceChange >= 0 ? "limegreen" : "red"}}>{priceChange.toFixed(2)} {currency}
                    </Typography>

                    <Typography
                        sx={{color: priceChange >= 0 ? "limegreen" : "red"}}>{percentageChange.toFixed(2)}%
                    </Typography>
                </Box>

                <Box>
                    <Typography >

                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default SymbolStats;