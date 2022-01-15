import {useEffect, useState} from "react";
import TrendingSymbols from "./trending/TrendingSymbols";
import ActiveContests from "./contest/ActiveContests";
import PortfolioStatus from "./PortfolioStatus";
import OrderTotal from "./OrderTotal";
import InvestmentTotal from "./InvestmentTotal";
import "./symbols.css";
import {Box, CircularProgress} from "@mui/material";
import {getUpcomingContests} from "../../../service/contestService";
import SearchField from "../search/SearchField";


const Symbols = () => {

    const [contestList, setContestList] = useState([]);
    const [runningContest, setRunningContest] = useState();
    const [isLoading, setLoading] = useState(true);

    const getContestNumberOfParticipatingContest = (contestsData) => {
        return contestsData.find(contest => contest.userParticipating && contest.contestStatus === "Running");
    }

    const fetchUpcomingContests = async () => {
        const response = await getUpcomingContests();
        const contests = response.data;
        if (contests) {
            setContestList(contests);
            setRunningContest(getContestNumberOfParticipatingContest(contests));
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchUpcomingContests().catch(error => console.log(error));
    }, []);

    const getParticipantData = () => {
        if (runningContest) {
            return (
                <>
                    <PortfolioStatus contest={runningContest}/>
                    <OrderTotal contest={runningContest}/>
                    <InvestmentTotal contest={runningContest}/>
                </>
            )
        }
    }

    if (isLoading) {
        return <CircularProgress/>
    }
    return (
        <Box id="symbolsPage">
            <SearchField/>
            <Box id="symbolsBody" sx={{display: "flex", flexFlow: "row nowrap", ml: "10%"}}>
                <TrendingSymbols/>
                <Box className="rightMenu" id="symbolsRightMenu" sx={{width: "30%"}}>
                    <ActiveContests contests={contestList} fetchUpcomingContests={fetchUpcomingContests}/>
                    {getParticipantData()}
                </Box>
            </Box>
        </Box>
    );
};

export default Symbols;
