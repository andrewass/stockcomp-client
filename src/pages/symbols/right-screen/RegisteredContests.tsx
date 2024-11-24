import {useQuery} from "@tanstack/react-query";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import React from "react";
import RegisteredContest from "./RegisteredContest";
import {useApiWrapper} from "../../../config/useApiWrapper";
import ErrorComponent from "../../../error/ErrorComponent";
import {
    GET_ALL_REGISTERED_CONTESTS,
    getRegisteredContestsConfig
} from "../../../participant/api/participantApi";
import {ContestParticipant} from "../../../participant/participantTypes";

const RegisteredContests = () => {
    const {apiGet} = useApiWrapper();

    const {isError, isPending, error, data} = useQuery<ContestParticipant[]>({
        queryKey: [GET_ALL_REGISTERED_CONTESTS],
        queryFn: () => apiGet(getRegisteredContestsConfig())
    });

    if (isError) return <ErrorComponent errorMessage={error.message}/>;

    if (isPending) return <CircularProgress/>;

    return (
        <Box>
            <Typography variant="h6">Participating Contests</Typography>
            {data.map((contestParticipant =>
                    <Card sx={{mb: "10px"}} key={contestParticipant.contest.contestNumber}>
                        <CardContent>
                            <RegisteredContest contest={contestParticipant.contest}/>
                        </CardContent>
                    </Card>
            ))}
        </Box>
    );
}

export default RegisteredContests;
