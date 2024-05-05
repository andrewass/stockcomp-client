import {Box, Button, Card, CardContent, CircularProgress, ListItem, ListItemText, Typography} from "@mui/material";
import toast from "react-hot-toast";
import CircleIcon from "@mui/icons-material/Circle";
import {useApiWrapper} from "../config/useApiWrapper";
import {queryClient} from "../config/queryConfig";
import {GET_CONTEST_PARTICIPANT, getContestParticipantConfig} from "../participant/api/participantApi";
import ErrorComponent from "../error/ErrorComponent";
import {ParticipantPortfolioStatus} from "../participant/ParticipantPortfolioStatus";
import {useMutation, useQuery} from "@tanstack/react-query";
import {CompleteParticipant} from "../participant/participantTypes";
import InvestmentList from "../symbols/right-menu/InvestmentList";
import {ActiveOrdersTotal} from "../investmentorder/total/ActiveOrdersTotal";
import {CompletedOrdersTotal} from "../investmentorder/total/CompletedOrdersTotal";
import {Contest, CONTEST_STATUS} from "../domain/contests/contestTypes";
import {getSignUpToContestConfig} from "../domain/contests/contestApi";


export const ActiveContest = ({contest}: { contest: Contest }) => {

    const {apiGet, apiPost} = useApiWrapper();

    const mutation = useMutation({
        mutationFn: () => {
            return apiPost(getSignUpToContestConfig(contest.contestNumber))
        },
        onSuccess: () =>
            queryClient.invalidateQueries({queryKey: [GET_CONTEST_PARTICIPANT, contest.contestNumber]}),
        onError: () => {
            toast.error("Unable to sign up for contest", {
                duration: 4000,
                position: "top-center"
            })
        }
    });

    const {isError, error, isPending, data} = useQuery<CompleteParticipant>({
        queryKey: [GET_CONTEST_PARTICIPANT, contest.contestNumber],
        queryFn: () => apiGet(getContestParticipantConfig(contest.contestNumber)),
    });

    const getContestStatus = () => {
        return (
            <Box display="flex">
                <CircleIcon sx={{color: contest.getStatusByColor(), marginRight: 1}}/>
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
                    <ListItemText primary={"Rank " + data.participant.rank + " / " + contest.participantCount}/>
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
                    <Typography variant="h6">Contest {contest.contestNumber}</Typography>
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