import React, {useEffect, useState} from "react";
import OrderSymbol from "./OrderSymbol";
import InvestmentSymbol from "./InvestmentSymbol";
import "./symbolRightMenu.css";
import {getUpcomingContests} from "../../../../service/contestService";
import {CircularProgress} from "@mui/material";

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
    }
    return (
        <div id="symbolRightMenu">
            <InvestmentSymbol contest={activeContest} symbol={symbol}/>
            <OrderSymbol contest={activeContest} symbol={symbol} currentPrice={currentPrice}/>
        </div>
    );
}

export default SymbolRightMenu;