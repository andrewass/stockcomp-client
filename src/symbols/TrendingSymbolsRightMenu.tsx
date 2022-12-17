import {CircularProgress} from "@mui/material";
import {getContestsConfig} from "../api/contestClient";
import {CONTEST_STATUS} from "../util/constants";
import ErrorComponent from "../components/common/ErrorComponent";
import {useApiRequest} from "../api/useApiRequest";


export const TrendingSymbolsRightMenu = () => {

    /*
    const fetchActiveContest = async () => {
        const contests = await getContests(
            [CONTEST_STATUS.AWAITING_START, CONTEST_STATUS.RUNNING, CONTEST_STATUS.STOPPED]
        )
        return contests.find(contest => contest !== undefined)
    }
    const fetchParticipant = () => {
        return getParticipant(contest!.contestNumber)
    }
     */


    const {isLoading: loadingContest, error: contestError, data: contest} =
        useApiRequest(getContestsConfig(
            [CONTEST_STATUS.AWAITING_START, CONTEST_STATUS.RUNNING, CONTEST_STATUS.STOPPED]))

    /*
    const {isLoading: loadingParticipant, error: participantError, data: participant} =
        useQuery("getParticipant", fetchParticipant, {enabled: !!contest})
     */

    if (loadingContest) return <CircularProgress/>

    if (contestError)
        return <ErrorComponent errorMessage={contestError ? contestError as string : ""}/>

    const getParticipantData = () => {
        /*
        if (participant) {
            return (
                <>
                    <PortfolioStatus participant={participant}/>
                    <InvestmentOrderTotal contest={contest!}/>
                    <InvestmentTotal contest={contest!}/>
                </>
            )
        }
         */
    }

    if (contest) {
        return <></>
        /*
        return (
            <Box className="rightMenu" id="symbolsRightMenu" sx={{width: "30%"}}>
                <ActiveContest contest={contest} participant={participant}/>
                {getParticipantData()}
            </Box>
        )
         */
    } else {
        return <></>
    }
}