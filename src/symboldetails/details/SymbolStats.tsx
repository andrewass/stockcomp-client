import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import {StockFinancials, StockPrice} from "../../domain/symbols/symbolTypes";

const SymbolStats = ({stockFinancials, stockPrice}: { stockFinancials: StockFinancials, stockPrice: StockPrice }) => {

    const {
        symbol, currency, currentPrice,
        usdPrice, companyName, priceChange, percentageChange
    } = stockPrice

    const {
        priceToBook, earningsPerShare, priceToEarnings,
        dividendYieldPercentage, dividendRate
    } = stockFinancials

    const getCurrentPrice = () => {
        if (currency === "USD") {
            return (
                <Typography display="inline">
                    {currentPrice} {currency}
                </Typography>
            );
        } else {
            return (
                <Typography display="inline">
                    {currentPrice} {currency} (USD {usdPrice})
                </Typography>
            );
        }
    }

    return (
        <Box id="symbolStats" sx={{padding: "0px 30px"}}>
            <Card elevation={0} sx={{mb: "30px"}}>
                <CardContent>
                    <Box>
                        <Typography component="h2" gutterBottom>
                            {companyName} ({symbol})
                        </Typography>

                        {getCurrentPrice()}

                        <Typography sx={{color: priceChange >= 0 ? "limegreen" : "red"}}>
                            {priceChange.toFixed(2)} {currency}
                        </Typography>

                        <Typography
                            sx={{color: priceChange >= 0 ? "limegreen" : "red"}}>{percentageChange.toFixed(2)}%
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            <Card elevation={0}>
                <CardContent>
                    <Grid container rowSpacing={2} columnSpacing={2} sx={{mt: "1rem"}}>
                        <Grid key="key1" item xs={6}>
                            <Typography>
                                Dividend Rate: {dividendRate ? dividendRate.toFixed(2)+" "+currency : "N/A"}
                            </Typography>
                        </Grid>
                        <Grid key="key2" item xs={6}>
                            <Typography>
                                Dividend Yield: {dividendYieldPercentage ? dividendYieldPercentage.toFixed(2) + "%" : "N/A"}
                            </Typography>
                        </Grid>
                        <Grid key="key3" item xs={6}>
                            <Typography>
                                Earnings Per Share: {earningsPerShare ? earningsPerShare.toFixed(2) : "N/A"} {currency}
                            </Typography>
                        </Grid>
                        <Grid key="key4" item xs={6}>
                            <Typography>
                                Price/Earnings: {priceToEarnings ? priceToEarnings.toFixed(2) : "N/A"}
                            </Typography>
                        </Grid>
                        <Grid key="key5" item xs={6}>
                            <Typography>
                                Price/Book: {priceToBook ? priceToBook.toFixed(2) : "N/A"}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}

export default SymbolStats;