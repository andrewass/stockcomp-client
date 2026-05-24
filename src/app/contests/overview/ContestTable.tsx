import Link from "next/link";
import PageableTable from "@/components/table/PageableTable.tsx";
import {
	type Contest,
	contestStatusRecord,
} from "@/domain/contests/contestTypes.ts";
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

export default function ContestTable({
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
				basePath="/contests/"
				headerItems={contestTableHeaderItems}
				renderRow={(contest) => (
					<tr key={contest.id}>
						<td>{contest.contestId}</td>
						<td>
							<Link
								href={`/contest/${contest.contestId}/0?pageSize=${pageSize}`}
								className="link link-hover font-medium"
							>
								{contest.contestName}
							</Link>
						</td>
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
