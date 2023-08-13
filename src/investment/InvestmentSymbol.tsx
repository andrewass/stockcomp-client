import InvestmentDetails from "./InvestmentDetails";
import {Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {useApiWrapper} from "../config/useApiWrapper";
import {GET_INVESTMENT_FOR_SYMBOL, getSymbolInvestmentConfig} from "./api/investmentApi";
import ErrorComponent from "../error/ErrorComponent";
import {Participant} from "../participant/participantTypes";


const InvestmentSymbol = ({participant, symbol}: { participant: Participant, symbol: string }) => {
    const {apiPost} = useApiWrapper();
    const {remainingFunds, contestNumber} = participant;

    const {isLoading, error, data: investment} = useQuery(
        [GET_INVESTMENT_FOR_SYMBOL, {symbol, contestNumber}],
        () => apiPost(getSymbolInvestmentConfig(symbol, contestNumber))
    );

    if (isLoading) return <CircularProgress/>;

    if (error) return <ErrorComponent errorMessage={error as string}/>;

    return (
        <Card elevation={0}>
            <CardContent>
                <Typography variant="h5" sx={{pb: "0.5rem"}}>
                    Portfolio Status
                </Typography>
                <Typography sx={{pb: "1rem"}}>
                    Remaining funds : {remainingFunds.toFixed(2)}
                </Typography>
                {investment &&
                    <InvestmentDetails investment={investment}/>
                }
            </CardContent>
        </Card>
    );
}

export default InvestmentSymbol;