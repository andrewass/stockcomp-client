import {useQuery} from "@tanstack/react-query";
import {Box, Card, CardContent, CircularProgress, Stack, Typography} from "@mui/material";
import React from "react";
import UnregisteredContest from "./UnregisteredContest";
import {useApiWrapper} from "../../../config/useApiWrapper";
import {Contest} from "../../../domain/contests/contestTypes";
import ErrorComponent from "../../../error/ErrorComponent";
import {GET_ALL_UNREGISTERED_CONTESTS, getUnregisteredContestsConfig} from "../../../domain/participant/participantApi";


const UnregisteredContests = () => {
    const {apiGet} = useApiWrapper();

    const {isPending, isError, error, data} = useQuery<Contest[]>({
        queryKey: [GET_ALL_UNREGISTERED_CONTESTS],
        queryFn: () => apiGet(getUnregisteredContestsConfig()),
    })

    if (isError) return <ErrorComponent errorMessage={error.message}/>;

    if (isPending) return <CircularProgress/>;

    return (
        <Box>
            <Typography variant="h6">Available Contests</Typography>
            <Stack spacing={3} sx={{mt: 3}}>
                {data.map(contest =>
                    <Card key={contest.contestId}>
                        <CardContent>
                            <UnregisteredContest contest={contest}/>
                        </CardContent>
                    </Card>
                )}
            </Stack>
        </Box>
    );
}

export default UnregisteredContests;
