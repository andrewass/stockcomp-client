import {useApiWrapper} from "../../config/useApiWrapper";
import {useQuery} from "@tanstack/react-query";
import ErrorComponent from "../../error/ErrorComponent";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import React from "react";
import RegisteredContest from "./RegisteredContest";
import {ContestsResponse} from "../../domain/contests/contestTypes";
import {GET_ALL_REGISTERED_CONTESTS, getRegisteredContestsConfig} from "../../domain/contests/contestApi";


const RegisteredContests = () => {
    const {apiGet} = useApiWrapper();

    const {isError, isPending, error, data} = useQuery<ContestsResponse>({
        queryKey: [GET_ALL_REGISTERED_CONTESTS],
        queryFn: () => apiGet(getRegisteredContestsConfig())
    });

    if (isError) return <ErrorComponent errorMessage={error.message}/>;

    if (isPending) return <CircularProgress/>;

    return (
        <Box>
            <Typography variant="h6">Participating Contests</Typography>
            {data.contests.map((contest =>
                    <Card sx={{mb: "10px"}}>
                        <CardContent>
                            <RegisteredContest contest={contest} key={contest.contestNumber}/>
                        </CardContent>
                    </Card>
            ))}
        </Box>
    );
}

export default RegisteredContests;