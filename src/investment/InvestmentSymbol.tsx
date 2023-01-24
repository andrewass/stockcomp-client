import InvestmentDetails from "./InvestmentDetails";
import {Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {useQuery} from "react-query";
import {Participant} from "../types/participant";
import {getInvestment} from "../api/investmentClient";
import ErrorComponent from "../components/common/ErrorComponent";


interface Props {
    participant: Participant
    symbol: string
}

const InvestmentSymbol = ({participant, symbol}: Props) => {

    const {remainingFunds} = participant;

    const fetchSymbolInvestment = () => {
        return getInvestment(symbol, participant.contestNumber);
    }

    const {isLoading, error, data: investment} =
        useQuery("getInvestmentOfSymbol", fetchSymbolInvestment);

    if (isLoading) return <CircularProgress/>;

    if (error) return <ErrorComponent errorMessage={error as string}/>;

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