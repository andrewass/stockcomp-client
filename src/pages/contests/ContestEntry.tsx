import { Link as MUILink, Stack, TableCell, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Contest,
  contestStatusRecord,
  getStatusByColor,
} from "../../domain/contests/contestTypes";
import { formatDate } from "../../util/dateUtils";
import { createLink } from "@tanstack/react-router";
import StyledTableRow from "../../components/table/StyledTableRow";

const CustomLink = createLink(MUILink);

interface Props {
  contest: Contest;
}

export const ContestEntry = ({ contest }: Props) => {
  return (
    <StyledTableRow rowId={contest.contestId}>
      <TableCell>
        <CustomLink
          to="/contests/$contestId"
          params={{ contestId: contest.contestId.toString() }}
        >
          <Typography>{contest.contestName}</Typography>
        </CustomLink>
      </TableCell>
      <TableCell>
        <Stack direction="row" gap={1}>
          <CircleIcon sx={{ color: getStatusByColor(contest) }} />
          <Typography>{contestStatusRecord[contest.contestStatus]}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography>{formatDate(contest.startTime)}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{formatDate(contest.endTime)}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{contest.contestId}</Typography>
      </TableCell>
    </StyledTableRow>
  );
};
