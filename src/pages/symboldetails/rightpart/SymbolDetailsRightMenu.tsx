import {Stack, useMediaQuery} from "@mui/material";
import {StockPrice} from "../../../domain/symbols/symbolTypes";
import {InvestmentOrderForm} from "./InvestmentOrderForm";
import {useTheme} from "@mui/material/styles";
import {DetailedParticipant} from "../../../domain/participant/participantTypes";
import ParticipantAccordionList from "./ParticipantAccordionList";


interface Props {
    stockPrice: StockPrice,
    participants: DetailedParticipant[]
}

export const SymbolDetailsRightMenu = ({stockPrice, participants}: Props) => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));

    return (
        <Stack direction="column" spacing={4}
             sx={{width: isLargeWidth ? "30%" : "70%", padding: "50px 30px", margin: "auto"}}
        >
            <InvestmentOrderForm participants={participants} symbol={stockPrice.symbol} stockPrice={stockPrice}/>
            <ParticipantAccordionList participants={participants} symbol={stockPrice.symbol}/>
        </Stack>
    );
}
