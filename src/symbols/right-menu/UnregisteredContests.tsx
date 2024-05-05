import {useApiWrapper} from "../../config/useApiWrapper";
import {useQuery} from "@tanstack/react-query";
import ErrorComponent from "../../error/ErrorComponent";
import {Card, CardContent, CardHeader, CircularProgress} from "@mui/material";
import React from "react";
import {Contest, ContestsResponse} from "../../domain/contests/contestTypes";
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
        <Card>
            <CardHeader title="Available Contests"/>
            <CardContent>
                {data.contests.map((contest: Contest) => <UnregisteredContest contest={contest}
                                                                              key={contest.contestNumber}/>)}
            </CardContent>
        </Card>
    );
}

export default UnregisteredContests;