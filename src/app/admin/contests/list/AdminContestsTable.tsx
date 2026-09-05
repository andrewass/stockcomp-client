import DataTable, { TableFrame } from "@/components/table/DataTable.tsx";
import UrlTablePager from "@/components/table/UrlTablePager.tsx";
import {
	type Contest,
	contestStatusRecord,
} from "@/domain/contests/contestTypes.ts";
import { formatDateTimeValue, formatMappedLabel } from "@/lib/formatters.ts";
import UpdateContestButton from "../update/UpdateContestButton.tsx";

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
	"Actions",
];

export default function AdminContestsTable({
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
						<td>{contest.contestName}</td>
						<td>
							{formatMappedLabel(contest.contestStatus, contestStatusRecord)}
						</td>
						<td>{contest.participantCount ?? "-"}</td>
						<td>{formatDateTimeValue(contest.startTime)}</td>
						<td>{formatDateTimeValue(contest.endTime)}</td>
						<td>
							<UpdateContestButton contest={contest} />
						</td>
					</tr>
				)}
			/>
			<UrlTablePager
				currentPage={currentPage}
				pageSize={pageSize}
				totalEntriesCount={totalEntriesCount}
				basePath="/admin/contests/"
			/>
		</TableFrame>
	);
}
