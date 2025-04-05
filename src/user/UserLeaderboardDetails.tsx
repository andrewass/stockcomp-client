import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {GET_LEADERBOARD_USER_ENTRY, getLeaderboardEntryUserConfig} from "../leaderboard/api/leaderboardApi";
import {useApiWrapper} from "../config/useApiWrapper";
import ErrorComponent from "../error/ErrorComponent";
import {ParticipantHistory} from "../participant/ParticipantHistory";
import {LeaderboardEntry} from "../leaderboard/leaderboardTypes";

interface Props {
    username: string
}

export const UserLeaderboardDetails = ({username}: Props) => {
    const {apiGet} = useApiWrapper();

    const {isPending, isError, error, data} = useQuery<LeaderboardEntry>({
        queryKey: [GET_LEADERBOARD_USER_ENTRY, username],
        queryFn: () => apiGet(getLeaderboardEntryUserConfig(username!))
    });

    if (isPending) return <CircularProgress/>

    if (isError) return <ErrorComponent error={error}/>

    return (
        <Box>
            <Card elevation={0} sx={{marginTop: "10%", marginLeft: "30%"}}>
                <CardContent>
                    <Box display="flex">
                        <Typography variant="h5">{username}</Typography>
                    </Box>
                    <Typography>Medals n/a</Typography>
                    <Typography>Leaderboard rank : {data.ranking}</Typography>
                    <Typography>Contest participation : {data.ranking}</Typography>
                </CardContent>
            </Card>
            <ParticipantHistory username={username!}/>
        </Box>
    )
}
