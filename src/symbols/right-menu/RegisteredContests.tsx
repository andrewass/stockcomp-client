import {useApiWrapper} from "../../config/useApiWrapper";
import {useQuery} from "@tanstack/react-query";
import ErrorComponent from "../../error/ErrorComponent";
import {Card, CardContent, CardHeader, CircularProgress, Typography} from "@mui/material";
import React from "react";
import RegisteredContest from "./RegisteredContest";
import {Contest} from "../../domain/contests/contestTypes";
import {GET_ALL_REGISTERED_CONTESTS, getRegisteredContestsConfig} from "../../domain/contests/contestApi";


const RegisteredContests = () => {
    const {apiGet} = useApiWrapper();

    const {status, error, data} = useQuery(
        [GET_ALL_REGISTERED_CONTESTS],
        () => apiGet(getRegisteredContestsConfig())
    );

    if (status === "error") return <ErrorComponent errorMessage={error as string}/>;

    if (status === "loading") return <CircularProgress/>;

    return (
        <Card>
            <CardHeader title="Participating Contests"/>
            <CardContent>
                {data.contests.map((contest: Contest) => <RegisteredContest contest={contest} key={contest.contestNumber}/>)}
            </CardContent>
        </Card>
    );
}

export default RegisteredContests;