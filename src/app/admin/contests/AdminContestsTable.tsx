import PageableTable from "@/components/table/PageableTable.tsx";
import {
	contestStatusRecord,
	type Contest,
} from "@/contest/contestTypes.ts";
import { formatDateTimeValue, formatMappedLabel } from "@/lib/formatters.ts";

interface Props {
	contests: Contest[];
	pageSize: number;
	currentPage: number;
	totalEntriesCount: number;
}

const contestTableHeaderItems = [
	"Contest ID",
	"Name",
	"Status",
	"Participants",
	"Start Time",
	"End Time",
];

type ContestTableEntry = Contest & {
	id: number;
};

export default function AdminContestsTable({
	contests,
	pageSize,
	currentPage,
	totalEntriesCount,
}: Props) {
	return (
		<div>
			<PageableTable<ContestTableEntry>
				items={contests.map((contest) => ({
					...contest,
					id: contest.contestId,
				}))}
				pageSize={pageSize}
				currentPage={currentPage}
				totalEntriesCount={totalEntriesCount}
				basePath="/admin/contests/"
				headerItems={contestTableHeaderItems}
				renderRow={(contest) => (
					<tr key={contest.id}>
						<td>{contest.contestId}</td>
						<td>{contest.contestName}</td>
						<td>
							{formatMappedLabel(contest.contestStatus, contestStatusRecord)}
						</td>
						<td>{contest.participantCount ?? "-"}</td>
						<td>{formatDateTimeValue(contest.startTime)}</td>
						<td>{formatDateTimeValue(contest.endTime)}</td>
					</tr>
				)}
			/>
		</div>
	);
}
