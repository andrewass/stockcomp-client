import Link from "next/link";
import DataTable, { TableFrame } from "@/components/table/DataTable.tsx";
import UrlTablePager from "@/components/table/UrlTablePager.tsx";
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

export default function ContestTable({
	contests,
	pageSize,
	currentPage,
	totalEntriesCount,
}: Props) {
	return (
		<TableFrame>
			<DataTable
				items={contests}
				headerItems={contestTableHeaderItems}
				renderRow={(contest) => (
					<tr key={contest.contestId}>
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
			<UrlTablePager
				currentPage={currentPage}
				pageSize={pageSize}
				totalEntriesCount={totalEntriesCount}
				basePath="/contests/"
			/>
		</TableFrame>
	);
}
