import {useApiWrapper} from "../../config/useApiWrapper";
import {useQuery} from "@tanstack/react-query";
import ErrorComponent from "../../error/ErrorComponent";
import {CardContent, CircularProgress, Typography} from "@mui/material";
import React from "react";
import RegisteredContest from "./RegisteredContest";
import {Contest} from "../../domain/contests/contestTypes";
import {GET_ALL_UNREGISTERED_CONTESTS, getUnregisteredContests} from "../../domain/contests/contestApi";

const UnregisteredContests = () => {
    const {apiGet} = useApiWrapper();

    const {isLoading, error, data} = useQuery(
        [GET_ALL_UNREGISTERED_CONTESTS],
        () => apiGet(getUnregisteredContests())
    );

    if (error) return <ErrorComponent errorMessage={error as string}/>

    if (isLoading) return <CircularProgress/>

    return (
        <React.Fragment>
            <CardContent>
                <Typography>Available Contests</Typography>
                {data?.contests.map((contest: Contest) => <RegisteredContest contest={contest}/>)}
            </CardContent>
        </React.Fragment>
    );
}

export default UnregisteredContests;