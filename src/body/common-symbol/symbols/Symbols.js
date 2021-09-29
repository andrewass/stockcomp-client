import React, {useEffect, useState} from "react";
import TrendingSymbols from "./trending/TrendingSymbols";
import ContestStatus from "./contest-status/ContestStatus";
import PortfolioStatus from "./portfolio-status/PortfolioStatus";
import OrderTotal from "./OrderTotal";
import InvestmentTotal from "./investment-total/InvestmentTotal";
import SearchBar from "../search/SearchBar";
import "./symbols.css";
import {CircularProgress} from "@mui/material";
import {getUpcomingContests} from "../../../service/contestService";


const Symbols = () => {

    const [contests, setContests] = useState([]);
    const [runningContest, setRunningContest] = useState();
    const [isLoading, setLoading] = useState(true);


    const getContestNumberOfParticipatingContest = () => {
        return contests.find(contest => contest.userParticipating && contest.running);
    }

    const fetchUpcomingContests = async () => {
        setLoading(true);
        let response = await getUpcomingContests()
        setContests(response.data);
        setRunningContest(getContestNumberOfParticipatingContest());
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
                    <ContestStatus contests={contests}/>
                    <PortfolioStatus contests={contests}/>
                    <OrderTotal contestNumber={contests}/>
                    <InvestmentTotal contests={contests}/>
                </div>
            </div>
        </div>
    );
};

export default Symbols;
