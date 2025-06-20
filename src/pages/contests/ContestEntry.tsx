import {
  Link as MUILink,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Contest,
  contestStatusRecord,
  getStatusByColor,
} from "../../domain/contests/contestTypes";
import { formatDate } from "../../util/dateUtils";
import { createLink } from "@tanstack/react-router";
import { useThemeContext } from "../../theme/AppThemeContext";
import { lightTheme } from "../../theme/themes";

const CustomLink = createLink(MUILink);

export const ContestEntry = ({ contest }: { contest: Contest }) => {
  const { appTheme } = useThemeContext();

  return (
    <TableRow
      key={contest.contestId}
      sx={{
        backgroundColor:
          appTheme === lightTheme
            ? appTheme.palette.primary.main
            : appTheme.palette.secondary.main,
      }}
    >
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
    </TableRow>
  );
};
