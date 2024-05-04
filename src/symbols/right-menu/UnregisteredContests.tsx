import {useApiWrapper} from "../../config/useApiWrapper";
import {useQuery} from "@tanstack/react-query";
import ErrorComponent from "../../error/ErrorComponent";
import {Card, CardContent, CardHeader, CircularProgress} from "@mui/material";
import React from "react";
import {Contest} from "../../domain/contests/contestTypes";
import {GET_ALL_UNREGISTERED_CONTESTS, getUnregisteredContests} from "../../domain/contests/contestApi";
import UnregisteredContest from "./UnregisteredContest";

const UnregisteredContests = () => {
    const {apiGet} = useApiWrapper();

    const {status, error, data} = useQuery(
        [GET_ALL_UNREGISTERED_CONTESTS],
        () => apiGet(getUnregisteredContests())
    );

    if (status === "error") return <ErrorComponent errorMessage={error as string}/>

    if (status === "loading") return <CircularProgress/>

    return (
        <Card>
            <CardHeader title="Available Contests"/>
            <CardContent>
                {data?.contests.map((contest: Contest) => <UnregisteredContest contest={contest}
                                                                               key={contest.contestNumber}/>)}
            </CardContent>
        </Card>
    );
}

export default UnregisteredContests;