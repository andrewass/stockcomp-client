import {Box, CircularProgress} from "@mui/material";
import {getContests} from "../../api/contestClient";
import {PortfolioStatus} from "../participant/PortfolioStatus";
import InvestmentOrderTotal from "../investmentorder/InvestmentOrderTotal";
import {InvestmentTotal} from "../investment/InvestmentTotal";
import {useQuery} from "react-query";
import {CONTEST_STATUS} from "../../util/constants";
import {getParticipant} from "../../api/participantClient";
import {ActiveContest} from "../contest/ActiveContest";
import ErrorComponent from "../common/ErrorComponent";


export const TrendingSymbolsRightMenu = () => {

    const fetchActiveContest = async () => {
        const contests = await getContests(
            [CONTEST_STATUS.AWAITING_START, CONTEST_STATUS.RUNNING, CONTEST_STATUS.STOPPED]
        )
        return contests.find(contest => contest !== undefined)
    }

    const fetchParticipant = () => {
        return getParticipant(contest!.contestNumber)
    }

    const {isLoading: loadingContest, error: contestError, data: contest} =
        useQuery("getActiveContest", fetchActiveContest)

    const {isLoading: loadingParticipant, error: participantError, data: participant} =
        useQuery("getParticipant", fetchParticipant, {enabled: !!contest})

    if (loadingContest || loadingParticipant) return <CircularProgress/>

    if (contestError || participantError)
        return <ErrorComponent errorMessage={contestError ? contestError as string : participantError as string}/>

    const getParticipantData = () => {
        if (participant) {
            return (
                <>
                    <PortfolioStatus participant={participant}/>
                    <InvestmentOrderTotal contest={contest!}/>
                    <InvestmentTotal contest={contest!}/>
                </>
            )
        }
    }

    return (
        <Box className="rightMenu" id="symbolsRightMenu" sx={{width: "30%"}}>
            <ActiveContest contest={contest} participant={participant}/>
            {getParticipantData()}
        </Box>
    )
}