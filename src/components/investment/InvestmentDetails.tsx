import {Card, CardContent, Typography} from "@mui/material";
import {Investment} from "../../types/investment";

interface Props{
    investment: Investment
}

const InvestmentDetails = ({investment}: Props) => {

    const {symbol, amount, totalProfit, totalValue} = investment;

    const displayInvestmentProfit = () => {
        if (totalProfit >= 0) {
            return <Typography display="inline" sx={{color:"limegreen"}}>
                +{totalProfit.toFixed(2)} USD
            </Typography>
        } else {
            return <Typography display= "inline" sx={{color:"red"}}>
                {totalProfit.toFixed(2)} USD
            </Typography>
        }
    }

    return(
        <Card elevation={0} sx={{mt:"1rem", mb:"2rem"}}>
            <CardContent>
                <Typography variant="h6">{symbol}</Typography>
                <Typography>Amount invested : {amount}</Typography>
                <Typography>Investment value : {totalValue.toFixed(2)} USD</Typography>
                <Typography>Investment profit : {displayInvestmentProfit()}</Typography>
            </CardContent>
        </Card>
    );
}

export default InvestmentDetails;