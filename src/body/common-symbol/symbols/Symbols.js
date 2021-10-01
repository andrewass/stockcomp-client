import React, {useEffect, useState} from "react";
import TrendingSymbols from "./trending/TrendingSymbols";
import ContestStatus from "./contest-status/ContestStatus";
import PortfolioStatus from "./PortfolioStatus";
import OrderTotal from "./OrderTotal";
import InvestmentTotal from "./InvestmentTotal";
import SearchBar from "../search/SearchBar";
import "./symbols.css";
import {CircularProgress} from "@mui/material";
import {getUpcomingContests} from "../../../service/contestService";


const Symbols = () => {

    const [contestList, setContestList] = useState([]);
    const [runningContest, setRunningContest] = useState();
    const [isLoading, setLoading] = useState(true);

    const getContestNumberOfParticipatingContest = (contestsData) => {
        return contestsData.find(contest => contest.userParticipating && contest.running);
    }

    const fetchUpcomingContests = async () => {
        const response = await getUpcomingContests();
        const contests = response.data;
        if(contests){
            setContestList(contests);
            setRunningContest(getContestNumberOfParticipatingContest(contests));
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchUpcomingContests().catch(error => console.log(error));
    }, []);

    if (isLoading) {
        return <CircularProgress/>
    }
    return (
        <div id="symbolsPage">
            <SearchBar/>
            <div id="symbolsBody">
                <TrendingSymbols/>
                <div className="rightMenu" id="symbolsRightMenu">
                    <ContestStatus contests={contestList}/>
                    <PortfolioStatus contest={runningContest}/>
                    <OrderTotal contest={runningContest}/>
                    <InvestmentTotal contest={runningContest}/>
                </div>
            </div>
        </div>
    );
};

export default Symbols;
