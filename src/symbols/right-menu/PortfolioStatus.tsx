import {Card, CardContent, Divider, Typography} from "@mui/material";
import {Participant} from "../../participant/participantTypes";

interface Props{
    participant: Participant
}

export const PortfolioStatus = ({participant}: Props) => {

    const {remainingFunds, totalValue, totalInvestmentValue} = participant

    return (
        <Card elevation={0} sx={{mt: "1rem", mb: "2rem"}}>
            <CardContent>
                <Typography variant="h5">Portfolio status</Typography>
                <Typography sx={{m: "0.5rem 0"}}>
                    Remaining funds : {remainingFunds.toFixed(2)} USD
                </Typography>
                <Typography>Investments value : {totalInvestmentValue.toFixed(2)} USD</Typography>
                <Divider sx={{m: "0.5rem 0"}}/>
                <Typography>
                    Total value : {totalValue.toFixed(2)} USD
                </Typography>
            </CardContent>
        </Card>
    )
}