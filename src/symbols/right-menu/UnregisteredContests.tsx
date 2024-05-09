import {useApiWrapper} from "../../config/useApiWrapper";
import {useQuery} from "@tanstack/react-query";
import ErrorComponent from "../../error/ErrorComponent";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import React from "react";
import {ContestsResponse} from "../../domain/contests/contestTypes";
import {GET_ALL_UNREGISTERED_CONTESTS, getUnregisteredContests} from "../../domain/contests/contestApi";
import UnregisteredContest from "./UnregisteredContest";

const UnregisteredContests = () => {
    const {apiGet} = useApiWrapper();

    const {isPending, isError, error, data} = useQuery<ContestsResponse>({
        queryKey: [GET_ALL_UNREGISTERED_CONTESTS],
        queryFn: () => apiGet(getUnregisteredContests()),
    })

    if (isError) return <ErrorComponent errorMessage={error.message}/>;

    if (isPending) return <CircularProgress/>;

    return (
        <Box>
            <Typography variant="h6">Available Contests</Typography>
            {data.contests.map(contest =>
                <Card>
                    <CardContent>
                        <UnregisteredContest contest={contest} key={contest.contestNumber}/>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
}

export default UnregisteredContests;