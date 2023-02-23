import {Box, Button, Card, CardContent, CircularProgress, ListItem, ListItemText, Typography} from "@mui/material";
import {useMutation, useQuery} from "react-query";
import {queryClient} from "../../config/queryConfig";
import toast from "react-hot-toast";
import CircleIcon from "@mui/icons-material/Circle";
import {CONTEST_STATUS} from "../../contests/contestTypes";
import {GET_CONTEST_PARTICIPANT, getContestParticipantConfig, getSignUpParticipantConfig} from "../api/symbolsApi";
import {useApiWrapper} from "../../config/apiWrapper";
import {Contest} from "../symbolsTypes";
import {PortfolioStatus} from "./PortfolioStatus";
import ErrorComponent from "../../error/ErrorComponent";

interface Props {
    contest: Contest
    key: number
}

export const ActiveContest = ({contest}: Props) => {

    const {apiGet, apiPost} = useApiWrapper();

    const mutation = useMutation({
        mutationFn: () => {
            return apiPost(getSignUpParticipantConfig(contest.contestNumber))
        },
        onSuccess: () =>
            queryClient.invalidateQueries(GET_CONTEST_PARTICIPANT + ":" + contest.contestNumber),
        onError: () => {
            toast.error("Unable to sign up for contest", {
                duration: 4000,
                position: "top-center"
            })
        }
    })

    const {isLoading, error, data: participant} = useQuery(
        GET_CONTEST_PARTICIPANT + ":" + contest.contestNumber,
        () => apiGet(getContestParticipantConfig(contest.contestNumber)));

    const getContestStatus = () => {
        return (
            <Box display="flex">
                <CircleIcon sx={{
                    color: contest.contestStatus === CONTEST_STATUS.RUNNING
                        ? "green" : "orange", marginRight: 1
                }}/>
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
        if (participant && contest.contestStatus === CONTEST_STATUS.RUNNING) {
            return (
                <Box>
                    <ListItemText primary={"Rank " + participant.rank + " / " + contest.participantCount}/>
                    <PortfolioStatus participant={participant} />
                </Box>
            )
        } else if (!participant) {
            return <Button onClick={() => mutation.mutate()}>Sign Up</Button>
        }
    }

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>;

    return (
        <ListItem>
            <Card elevation={0}>
                <CardContent>
                    <Typography variant="h6">Contest {contest.contestNumber}</Typography>
                    {getContestStatus()}
                    {getParticipantStatus()}
                </CardContent>
            </Card>
        </ListItem>
    );
}