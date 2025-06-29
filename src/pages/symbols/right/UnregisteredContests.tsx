import { useQuery } from "@tanstack/react-query";
import { Box, Card, CardContent, CircularProgress, Stack } from "@mui/material";
import React from "react";
import UnregisteredContest from "./UnregisteredContest";
import { useApiWrapper } from "../../../config/useApiWrapper";
import { Contest } from "../../../domain/contests/contestTypes";
import ErrorComponent from "../../../error/ErrorComponent";
import {
  GET_ALL_UNREGISTERED_CONTESTS,
  getUnregisteredContestsConfig,
} from "../../../domain/participant/participantApi";

const UnregisteredContests = () => {
  const { apiGet } = useApiWrapper();

  const {
    isPending,
    isError,
    error,
    data: contests,
  } = useQuery<Contest[]>({
    queryKey: [GET_ALL_UNREGISTERED_CONTESTS],
    queryFn: () => apiGet(getUnregisteredContestsConfig()),
  });

  if (isError) return <ErrorComponent error={error} />;

  if (isPending) return <CircularProgress />;

  if (contests.length === 0) return null;

  return (
    <Box>
      <Stack spacing={3} sx={{ mt: 3 }}>
        {contests.map((contest) => (
          <Card key={contest.contestId}>
            <CardContent>
              <UnregisteredContest contest={contest} />
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default UnregisteredContests;
