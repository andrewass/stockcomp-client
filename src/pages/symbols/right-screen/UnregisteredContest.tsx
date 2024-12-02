import React from "react";
import {useMutation} from "@tanstack/react-query";
import {Button, Typography} from "@mui/material";
import {Contest} from "../../../domain/contests/contestTypes";
import {useApiWrapper} from "../../../config/useApiWrapper";
import {queryClient} from "../../../config/queryConfig";
import toast from "react-hot-toast";
import {
    GET_ALL_REGISTERED_CONTESTS,
    GET_ALL_UNREGISTERED_CONTESTS,
    getSignUpParticipantConfig
} from "../../../domain/participant/participantApi";


interface Props {
    contest: Contest
}

const UnregisteredContest = ({contest}: Props) => {
    const {apiPostVoid} = useApiWrapper();

    const mutation = useMutation({
        mutationFn: () => {
            return apiPostVoid(getSignUpParticipantConfig(contest.contestId));
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [GET_ALL_REGISTERED_CONTESTS]});
            await queryClient.invalidateQueries({queryKey: [GET_ALL_UNREGISTERED_CONTESTS]});
        },
        onError: () => {
            toast.error("Unable to sign up for contest", {
                duration: 4000,
                position: "top-center"
            });
        }
    });

    return (
        <React.Fragment>
            <Typography>Contest {contest.contestId}</Typography>
            <Typography>Status {contest.contestStatus}</Typography>
            <Typography>From {contest.startTime}</Typography>
            <Button onClick={() => mutation.mutate()}>Sign Up</Button>
        </React.Fragment>
    );
}

export default UnregisteredContest;
