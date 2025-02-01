import {Box} from "@mui/material";
import {ActiveOrdersSymbol} from "./ActiveOrdersSymbol";
import {DetailedParticipant} from "../../../domain/participant/participantTypes";

interface Props {
    participants: DetailedParticipant[]
    symbol: string
}

export const InvestmentOrdersSymbol = ({participants, symbol}: Props) => {

    return (
        <Box>
            <ActiveOrdersSymbol participants={participants} symbol={symbol}/>
        </Box>
    );
}
