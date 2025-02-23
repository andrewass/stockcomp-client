import {Box, useMediaQuery} from "@mui/material";
import {StockPrice} from "../../../domain/symbols/symbolTypes";
import InvestmentSymbol from "../../../investment/InvestmentSymbol";
import {InvestmentOrderForm} from "./InvestmentOrderForm";
import {InvestmentOrdersSymbol} from "./InvestmentOrdersSymbol";
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
        <Box id="symbolDetailsRighMenu"
             display="flex"
             flexDirection="column"
             sx={{width: isLargeWidth ? "30%" : "70%", padding: "50px 30px", margin: "auto"}}
        >
            <InvestmentSymbol participants={participants} symbol={stockPrice.symbol}/>
            <InvestmentOrderForm participants={participants} symbol={stockPrice.symbol} stockPrice={stockPrice}/>
            <InvestmentOrdersSymbol participants={participants} symbol={stockPrice.symbol}/>
            <ParticipantAccordionList participants={participants} symbol={stockPrice.symbol}/>
        </Box>
    );
}
