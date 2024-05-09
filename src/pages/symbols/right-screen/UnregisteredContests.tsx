import {useQuery} from "@tanstack/react-query";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import React from "react";
import UnregisteredContest from "./UnregisteredContest";
import {useApiWrapper} from "../../../config/useApiWrapper";
import {ContestsResponse} from "../../../domain/contests/contestTypes";
import {GET_ALL_UNREGISTERED_CONTESTS, getUnregisteredContests} from "../../../domain/contests/contestApi";
import ErrorComponent from "../../../error/ErrorComponent";

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
                <Card key={contest.contestNumber}>
                    <CardContent>
                        <UnregisteredContest contest={contest}/>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
}

export default UnregisteredContests;