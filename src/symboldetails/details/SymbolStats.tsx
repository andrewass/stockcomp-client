import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import {Stock} from "../../stock/stockTypes";

interface Props {
    symbolDetails: Stock
}

const SymbolStats = ({symbolDetails}: Props) => {

    const {stockQuote,stockStats, symbol, description} = symbolDetails;
    const {currency, percentageChange, price, usdPrice, priceChange} = stockQuote;
    const {annualDividendYieldPercent, earningsPerShare, priceToEarnings, priceToBook} = stockStats!;

    const getCurrentPrice = () => {
        if (currency === "USD") {
            return (
                <Typography display="inline">
                    {price} {currency}
                </Typography>
            );
        } else {
            return (
                <Typography display="inline">
                    {price} {currency} (USD {usdPrice})
                </Typography>
            );
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

                <Grid container rowSpacing={2} columnSpacing={2} sx={{mt:"1rem"}}>
                    <Grid key="temp1" item xs={6}>
                        <Typography>
                            Annual Dividend Yield: {annualDividendYieldPercent.toFixed(2)}%
                        </Typography>
                    </Grid>
                    <Grid key="temp2" item xs={6}>
                        <Typography>
                            Earnings Per Share: {earningsPerShare.toFixed(2)} {currency}
                        </Typography>
                    </Grid>
                    <Grid key="temp3" item xs={6}>
                        <Typography>
                           Price/Earnings: {priceToEarnings.toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid key="temp4" item xs={6}>
                        <Typography>
                            Price/Book: {priceToBook.toFixed(2)}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default SymbolStats;