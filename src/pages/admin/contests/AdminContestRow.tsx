import TableCell from "@mui/material/TableCell";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AdminUpdateContestModal } from "./AdminUpdateContestModal";
import {
  Contest,
  CONTEST_STATUS,
  contestStatusRecord,
  getStatusByColor,
} from "../../../domain/contests/contestTypes";
import { useApiWrapper } from "../../../config/useApiWrapper";
import {
  GET_ALL_CONTESTS,
  getDeleteContestConfig,
} from "../../../domain/contests/contestApi";
import { queryClient } from "../../../config/queryConfig";
import { formatDate } from "../../../util/dateUtils";
import StyledTableRow from "../../../components/table/StyledTableRow";
import CircleIcon from "@mui/icons-material/Circle";

export const AdminContestRow = ({ contest }: { contest: Contest }) => {
  const { apiDelete } = useApiWrapper();

  const mutation = useMutation({
    mutationFn: () => {
      return apiDelete(getDeleteContestConfig(contest.contestId));
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [GET_ALL_CONTESTS] }),
  });

  return (
    <StyledTableRow rowId={contest.contestId}>
      <TableCell>{contest.contestName}</TableCell>
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
        <AdminUpdateContestModal contest={contest} />
      </TableCell>
      <TableCell>
        <IconButton
          disabled={contest.contestStatus === CONTEST_STATUS.COMPLETED}
          onClick={() => mutation.mutate()}
        >
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
    </StyledTableRow>
  );
};
