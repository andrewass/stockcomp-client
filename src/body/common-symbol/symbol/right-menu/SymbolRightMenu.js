import {useEffect, useState} from "react";
import {OrderSymbol} from "./OrderSymbol";
import InvestmentSymbol from "./InvestmentSymbol";
import {getActiveContests} from "../../../../service/contestService";
import {Box, CircularProgress} from "@mui/material";

export const SymbolRightMenu = ({symbol, stockQuote, isLargeWidth}) => {

    const [activeContest, setActiveContest] = useState();
    const [isLoading, setLoading] = useState(true);

    const getActiveContest = contests => {
        return contests.find(contest => contest.userParticipating);
    }

    const fetchUpcomingContests = async () => {
        setLoading(true)
        let response = await getActiveContests();
        setActiveContest(getActiveContest(response.data));
        setLoading(false);
    }

    useEffect(() => {
        fetchUpcomingContests().catch(error => console.log(error));
    }, []);

    if (isLoading) {
        return <CircularProgress/>
    } else if(activeContest) {
        return (
            <Box id="symbolRightMenu" sx={{width: isLargeWidth ? "30%" :"70%"}}>
                <InvestmentSymbol contest={activeContest} symbol={symbol}/>
                <OrderSymbol contest={activeContest} symbol={symbol} stockQuote={stockQuote}/>
            </Box>
        );
    }else {
        return null;
    }
}