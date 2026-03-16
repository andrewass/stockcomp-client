import PageableTable from "@/components/table/PageableTable.tsx";
import type { Contest } from "@/contest/contestTypes.ts";

type Props = {
	contests: Contest[];
	pageSize: number;
	currentPage: number;
	totalEntriesCount: number;
};

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
				headerItems={contestTableHeaderItems}
				renderRow={(contest) => (
					<tr key={contest.id}>
						<td>{contest.contestId}</td>
						<td>{contest.contestName}</td>
						<td>{contest.contestStatus}</td>
						<td>{contest.participantCount ?? "-"}</td>
						<td>{contest.startTime}</td>
						<td>{contest.endTime}</td>
					</tr>
				)}
			/>
		</div>
	);
}
