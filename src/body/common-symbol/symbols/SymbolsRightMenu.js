import {Box, CircularProgress} from "@mui/material";
import {ActiveContests} from "./contest/ActiveContests";
import {getUpcomingContests} from "../../../service/contestService";
import {PortfolioStatus} from "./PortfolioStatus";
import OrderTotal from "./OrderTotal";
import {InvestmentTotal} from "./InvestmentTotal";
import {useQuery} from "react-query";


export const SymbolsRightMenu = () => {

    const getRunningContestsWithUserParticipation = (contests) => {
        return contests.find(contest => contest.userParticipating && contest.contestStatus === "Running");
    }

    const fetchUpcomingContests = async () => {
        const response = await getUpcomingContests();
        return response.data;
    }

    const getParticipantData = (contests) => {
        const runningContest = getRunningContestsWithUserParticipation(contests);
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

    const {isLoading, error, data} = useQuery("getUpcomingContests", fetchUpcomingContests);

    if (isLoading) return <CircularProgress/>

    if (error) return `Error! ${error}`;

    return (
        <Box className="rightMenu" id="symbolsRightMenu" sx={{width: "30%"}}>
            <ActiveContests contests={data}/>
            {getParticipantData(data)}
        </Box>
    );
}