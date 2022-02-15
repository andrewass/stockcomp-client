import Investment from "../../investment/Investment";
import {getRemainingFunds} from "../../../../service/contestService";
import {getInvestmentOfSymbol} from "../../../../service/investmentService";
import {Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {useQuery} from "react-query";


const InvestmentSymbol = ({contest, symbol}) => {

    const fetchRemainingFunds = async () => {
        const response = await getRemainingFunds(contest.contestNumber);
        return response.data;
    }

    const fetchSymbolInvestment = async () => {
        const response = await getInvestmentOfSymbol(contest.contestNumber, symbol);
        return response.data;
    }

    const {isLoading: fundsLoading, error: fundsError, data: fundsData} =
        useQuery("getRemainingFunds", fetchRemainingFunds);

    const {isLoading: investmentLoading, error: investmentError, data: investmentData} =
        useQuery("getInvestmentOfSymbol", fetchSymbolInvestment);

    if (fundsLoading || investmentLoading) return <CircularProgress/>;

    if (fundsError || investmentError) return `Error! ${fundsError ? fundsError : investmentError}`;

    return (
        <Card elevation={0} id="investmentSymbol">
            <CardContent>
                <Typography variant="h5" sx={{pb: "0.5rem"}}>Portfolio Status</Typography>
                <Typography sx={{pb: "1rem"}}>Remaining funds : {fundsData.toFixed(2)}</Typography>
                {investmentData ? <Investment investment={investmentData}/> : null}
            </CardContent>
        </Card>
    );
}

export default InvestmentSymbol;