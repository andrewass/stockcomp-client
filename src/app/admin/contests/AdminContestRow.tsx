import CircleIcon from "@mui/icons-material/Circle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton, Stack, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { useDeleteContestMutation } from "@/admin/contests/useAdminContests.ts";
import StyledTableRow from "@/components/table/StyledTableRow.tsx";
import {
	CONTEST_STATUS,
	type Contest,
	contestStatusRecord,
	getStatusByColor,
} from "@/contest/contestTypes.ts";
import { formatDate } from "../../../util/dateUtils";
import AdminUpdateContestModal from "./AdminUpdateContestModal";

export default function AdminContestRow({ contest }: { contest: Contest }) {
	const mutation = useDeleteContestMutation(contest.contestId);

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
}
