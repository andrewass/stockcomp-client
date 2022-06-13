import InvestmentDetails from "./InvestmentDetails";
import {getInvestment} from "../../api/investmentClient";
import {Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {useQuery} from "react-query";
import {Contest} from "../../types/contest";
import {Participant} from "../../types/participant";

interface Props{
    contest: Contest
    participant: Participant
    symbol: string
}

const InvestmentSymbol = ({contest, participant, symbol}: Props) => {

    const {remainingFunds} = participant;

    const fetchSymbolInvestment = () => {
        return getInvestment(symbol, contest.contestNumber);
    }

    const {isLoading: investmentLoading, error: investmentError, data: investment} =
        useQuery("getInvestmentOfSymbol", fetchSymbolInvestment);

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
                {investment ? <InvestmentDetails investment={investment}/> : null}
            </CardContent>
        </Card>
    );
}

export default InvestmentSymbol;