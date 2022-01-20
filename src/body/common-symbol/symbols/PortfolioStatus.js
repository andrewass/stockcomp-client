import {getRemainingFunds} from "../../../service/contestService";
import {getTotalValueInvestments} from "../../../service/investmentService";
import {Card, CardContent, CircularProgress, Divider, Typography} from "@mui/material";
import {useQuery} from "react-query";


export const PortfolioStatus = ({contest}) => {

    const fetchRemainingFunds = async () => {
        const response = await getRemainingFunds(contest.contestNumber);
        return response.data;
    }

    const fetchTotalValueInvestments = async () => {
        const response = await getTotalValueInvestments(contest.contestNumber);
        return response.data;
    }

    const {isLoading: fundsLoading, error: fundsError, data: fundsData} =
        useQuery("remainingFunds", fetchRemainingFunds);

    const {isLoading: investmentLoading, error: investmentError, data: investmentData} =
        useQuery("investmentTotal", fetchTotalValueInvestments);

    if (fundsLoading || investmentLoading) return <CircularProgress/>;

    if (fundsError || investmentError) return `Error! ${fundsError ? fundsError : investmentError}`;

    return(
        <Card elevation={0} sx={{mt:"1rem", mb:"2rem"}}>
            <CardContent>
                <Typography variant="h5">Portfolio status</Typography>
                <Typography sx={{m:"0.5rem 0"}}>Remaining funds : {fundsData.toFixed(2)} USD</Typography>
                <Typography>Investments value : {investmentData.toFixed(2)} USD</Typography>
                <Divider sx={{m:"0.5rem 0"}}/>
                <Typography>Total value : {(investmentData+fundsData).toFixed(2)} USD</Typography>
            </CardContent>
        </Card>
    )
}