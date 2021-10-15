import React, {useEffect, useState} from "react";
import OrderSymbol from "./OrderSymbol";
import InvestmentSymbol from "./InvestmentSymbol";
import {getUpcomingContests} from "../../../../service/contestService";
import {Box, CircularProgress} from "@mui/material";

const SymbolRightMenu = ({symbol, currentPrice}) => {

    const [activeContest, setActiveContest] = useState();
    const [isLoading, setLoading] = useState(true);

    const getActiveContest = contests => {
        return contests.find(contest => contest.userParticipating && contest.running);
    }

    const fetchUpcomingContests = async () => {
        setLoading(true)
        let response = await getUpcomingContests();
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
            <Box id="symbolRightMenu" sx={{width: "30%"}}>
                <InvestmentSymbol contest={activeContest} symbol={symbol}/>
                <OrderSymbol contest={activeContest} symbol={symbol} currentPrice={currentPrice}/>
            </Box>
        );
    }else {
        return null;
    }
}

export default SymbolRightMenu;