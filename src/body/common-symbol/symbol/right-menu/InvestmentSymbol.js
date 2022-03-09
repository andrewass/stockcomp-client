import Investment from "../../investment/Investment";
import {getInvestmentOfSymbol} from "../../../../service/investmentService";
import {Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {useQuery} from "react-query";


const InvestmentSymbol = ({contest,participant, symbol}) => {

    const {remainingFunds} = participant;

    const fetchSymbolInvestment = async () => {
        const response = await getInvestmentOfSymbol(contest.contestNumber, symbol);
        return response.data;
    }

    const {isLoading: investmentLoading, error: investmentError, data: investmentData} =
        useQuery(["getInvestmentOfSymbol", symbol], fetchSymbolInvestment);

    if (investmentLoading) return <CircularProgress/>;

    if (investmentError) return `Error! ${investmentError}`;

    return (
        <Card elevation={0} id="investmentSymbol">
            <CardContent>
                <Typography variant="h5" sx={{pb: "0.5rem"}}>
                    Portfolio Status
                </Typography>
                <Typography sx={{pb: "1rem"}}>
                    Remaining funds : {remainingFunds.toFixed(2)}
                </Typography>
                {investmentData ? <Investment investment={investmentData}/> : null}
            </CardContent>
        </Card>
    );
}

export default InvestmentSymbol;