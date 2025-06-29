import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Stack } from "@mui/material";
import React from "react";
import RegisteredContest from "./RegisteredContest";
import { useApiWrapper } from "../../../config/useApiWrapper";
import ErrorComponent from "../../../error/ErrorComponent";
import { ContestParticipant } from "../../../domain/participant/participantTypes";
import {
  GET_ALL_REGISTERED_CONTESTS,
  getRegisteredContestsConfig,
} from "../../../domain/participant/participantApi";

export default function RegisteredContests() {
  const { apiGet } = useApiWrapper();

  const {
    isError,
    isPending,
    error,
    data: contests,
  } = useQuery<ContestParticipant[]>({
    queryKey: [GET_ALL_REGISTERED_CONTESTS],
    queryFn: () => apiGet(getRegisteredContestsConfig()),
  });

  if (isError) return <ErrorComponent error={error} />;

  if (isPending) return <CircularProgress />;

  if (contests.length === 0) return null;

  return (
    <Stack gap={3}>
      {contests.map((contestParticipant) => (
        <RegisteredContest
          contest={contestParticipant.contest}
          key={contestParticipant.contest.contestId}
        />
      ))}
    </Stack>
  );
}
