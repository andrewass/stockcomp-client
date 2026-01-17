import CircleIcon from "@mui/icons-material/Circle";
import { Stack, TableCell, Typography } from "@mui/material";
import StyledLink from "@/components/link/StyledLink.tsx";
import StyledTableRow from "@/components/table/StyledTableRow.tsx";
import {
	type Contest,
	contestStatusRecord,
	getStatusByColor,
} from "@/contest/contestTypes.ts";
import { formatDate } from "../../util/dateUtils";

interface Props {
	contest: Contest;
}

export default function ContestRow({ contest }: Props) {
	return (
		<StyledTableRow rowId={contest.contestId}>
			<TableCell>
				<StyledLink
					href={{
						pathname: "/contests/$contestId",
						query: { contestId: contest.contestId.toString() },
					}}
				>
					<Typography>{contest.contestName}</Typography>
				</StyledLink>
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
}
