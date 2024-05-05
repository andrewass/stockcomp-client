import {useApiWrapper} from "../../config/useApiWrapper";
import {useQuery} from "@tanstack/react-query";
import ErrorComponent from "../../error/ErrorComponent";
import {Card, CardContent, CardHeader, CircularProgress} from "@mui/material";
import React from "react";
import RegisteredContest from "./RegisteredContest";
import {Contest, ContestsResponse} from "../../domain/contests/contestTypes";
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
        <Card>
            <CardHeader title="Participating Contests"/>
            <CardContent>
                {data.contests.map((contest: Contest) => <RegisteredContest contest={contest}
                                                                            key={contest.contestNumber}/>)}
            </CardContent>
        </Card>
    );
}

export default RegisteredContests;