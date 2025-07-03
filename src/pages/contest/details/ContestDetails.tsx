import { Stack, Typography } from "@mui/material";
import {
  Contest,
  getStatusByColor,
} from "../../../domain/contests/contestTypes";
import CircleIcon from "@mui/icons-material/Circle";
import ContestLeaderboard from "./ContestLeaderboard";
import { formatDate } from "../../../util/dateUtils";

interface Props {
  contest: Contest;
}

export default function ContestDetails({ contest }: Props) {
  return (
    <Stack direction="column" width="100%" gap={5}>
      <Stack gap={1}>
        <Stack direction="row" gap={1.2} alignItems="center">
          <Typography variant="h5">{contest.contestName}</Typography>
          <CircleIcon sx={{ color: getStatusByColor(contest) }} />
        </Stack>
        <Typography>
          {formatDate(contest.startTime)} to {formatDate(contest.endTime)}
        </Typography>
      </Stack>
      <ContestLeaderboard contestId={contest.contestId} />
    </Stack>
  );
}
