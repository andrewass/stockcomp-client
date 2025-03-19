import {Box, Button, Card, CardContent, CircularProgress, ListItem, ListItemText, Typography} from "@mui/material";
import toast from "react-hot-toast";
import CircleIcon from "@mui/icons-material/Circle";
import {Contest, CONTEST_STATUS, getStatusByColor} from "../../domain/contests/contestTypes";
import {useApiWrapper} from "../../config/useApiWrapper";
import {useMutation, useQuery} from "@tanstack/react-query";
import {
    GET_PARTICIPANT_CONTEST,
    getDetailedParticipantForContestConfig,
    getSignUpParticipantConfig
} from "../../domain/participant/participantApi";
import {DetailedParticipant} from "../../domain/participant/participantTypes";
import InvestmentList from "../symbols/right/InvestmentList";
import {ActiveOrdersTotal} from "../../investmentorder/total/ActiveOrdersTotal";
import {CompletedOrdersTotal} from "../../investmentorder/total/CompletedOrdersTotal";
import {queryClient} from "../../config/queryConfig";
import {ParticipantPortfolioStatus} from "../../participant/ParticipantPortfolioStatus";
import ErrorComponent from "../../error/ErrorComponent";


export const ActiveContest = ({contest}: { contest: Contest }) => {

    const {apiGet, apiPost} = useApiWrapper();

    const mutation = useMutation({
        mutationFn: () => {
            return apiPost(getSignUpParticipantConfig(contest.contestId))
        },
        onSuccess: () =>
            queryClient.invalidateQueries({queryKey: [GET_PARTICIPANT_CONTEST, contest.contestId]}),
        onError: () => {
            toast.error("Unable to sign up for contest", {
                duration: 4000,
                position: "top-center"
            })
        }
    });

    const {isError, error, isPending, data} = useQuery<DetailedParticipant>({
        queryKey: [GET_PARTICIPANT_CONTEST, contest.contestId],
        queryFn: () => apiGet(getDetailedParticipantForContestConfig(contest.contestId)),
    });

    const getContestStatus = () => {
        return (
            <Box display="flex">
                <CircleIcon sx={{color: getStatusByColor(contest), marginRight: 1}}/>
                <Typography>
                    {contest.contestStatus === CONTEST_STATUS.RUNNING
                        ? "Ending " + contest.endTime
                        : "Starting " + contest.startTime
                    }
                </Typography>
            </Box>
        );
    }

    const getParticipantStatus = () => {
        if (data) {
            return (
                <Box>
                    <ListItemText primary={"Rank " + data.participant.rank + " / placeholder"}/>
                    <ParticipantPortfolioStatus participant={data.participant}/>
                </Box>
            );
        } else if (!data) {
            return <Button onClick={() => mutation.mutate()}>Sign Up</Button>;
        }
    }

    if (isPending) return <CircularProgress/>;

    if (isError) return <ErrorComponent errorMessage={error.message}/>;

    return (
        <ListItem>
            <Card elevation={0}>
                <CardContent>
                    <Typography variant="h6">Contest {contest.contestId}</Typography>
                    {getContestStatus()}
                    {getParticipantStatus()}
                </CardContent>
                {data &&
                    <Box>
                        <InvestmentList investments={data.investments}/>
                        <ActiveOrdersTotal activeOrders={data.activeOrders}/>
                        <CompletedOrdersTotal completedOrders={data.completedOrders}/>
                    </Box>
                }
            </Card>
        </ListItem>
    );
}
