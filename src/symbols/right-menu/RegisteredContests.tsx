import {useApiWrapper} from "../../config/useApiWrapper";
import {useQuery} from "@tanstack/react-query";
import ErrorComponent from "../../error/ErrorComponent";
import {CardContent, CircularProgress, Typography} from "@mui/material";
import React from "react";
import RegisteredContest from "./RegisteredContest";
import {Contest} from "../../domain/contests/contestTypes";
import {GET_ALL_REGISTERED_CONTESTS, getRegisteredContests} from "../../domain/contests/contestApi";


const RegisteredContests = () => {
    const {apiGet} = useApiWrapper();

    const {isLoading, error, data: contests} = useQuery<Contest[]>(
        [GET_ALL_REGISTERED_CONTESTS],
        () => apiGet(getRegisteredContests())
    );

    if (error) return <ErrorComponent errorMessage={error as string}/>

    if (isLoading) return <CircularProgress/>

    return (
        <React.Fragment>
            <CardContent>
                <Typography>Participating Contests</Typography>
                {contests!.map(contest => <RegisteredContest contest={contest}/>)}
            </CardContent>
        </React.Fragment>
    )
}

export default RegisteredContests;