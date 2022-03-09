import {getTotalValueInvestments} from "../../../service/investmentService";
import {Card, CardContent, CircularProgress, Divider, Typography} from "@mui/material";
import {useQuery} from "react-query";


export const PortfolioStatus = ({contest, participant}) => {

    const {remainingFunds, totalValue} = participant;

    const fetchTotalValueInvestments = async () => {
        const response = await getTotalValueInvestments(contest.contestNumber);
        return response.data;
    }

    const {isLoading, error, data: investmentValue} =
        useQuery("getInvestmentTotal", fetchTotalValueInvestments);

    if (isLoading) return <CircularProgress/>;

    if (error) return `Error! ${error}`;

    return (
        <Card elevation={0} sx={{mt: "1rem", mb: "2rem"}}>
            <CardContent>
                <Typography variant="h5">Portfolio status</Typography>
                <Typography sx={{m: "0.5rem 0"}}>
                    Remaining funds : {remainingFunds.toFixed(2)} USD
                </Typography>
                <Typography>Investments value : {investmentValue.toFixed(2)} USD</Typography>
                <Divider sx={{m: "0.5rem 0"}}/>
                <Typography>
                    Total value : {totalValue.toFixed(2)} USD
                </Typography>
            </CardContent>
        </Card>
    )
}