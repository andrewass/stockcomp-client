import {Box} from "@mui/material";
import {ActiveOrdersSymbol} from "./ActiveOrdersSymbol";
import {CompleteParticipant} from "../../../participant/participantTypes";

interface Props {
    participants: CompleteParticipant[]
    symbol: string
}

export const InvestmentOrdersSymbol = ({participants, symbol}: Props) => {

    return (
        <Box>
            <ActiveOrdersSymbol participants={participants} symbol={symbol}/>
        </Box>
    );
}
