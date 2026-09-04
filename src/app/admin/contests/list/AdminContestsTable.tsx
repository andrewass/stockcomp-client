import { PencilSquareIcon } from "@heroicons/react/24/outline";
import DataTable, { TableFrame } from "@/components/table/DataTable.tsx";
import UrlTablePager from "@/components/table/UrlTablePager.tsx";
import {
	CONTEST_STATUS,
	type Contest,
	contestStatusRecord,
} from "@/domain/contests/contestTypes.ts";
import { formatDateTimeValue, formatMappedLabel } from "@/lib/formatters.ts";

interface Props {
	contests: Contest[];
	pageSize: number;
	currentPage: number;
	totalEntriesCount: number;
	onEditContest: (contest: Contest) => void;
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
	onEditContest,
}: Props) {
	return (
		<TableFrame>
			<DataTable
				items={contests}
				headerItems={contestTableHeaderItems}
				renderRow={(contest) => {
					const isCompleted =
						contest.contestStatus === CONTEST_STATUS.COMPLETED;

					return (
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
								<button
									type="button"
									className="btn btn-ghost btn-sm btn-circle"
									onClick={() => onEditContest(contest)}
									aria-label={`Edit ${contest.contestName}`}
									title={
										isCompleted
											? "Completed contests cannot be edited"
											: "Edit contest"
									}
									disabled={isCompleted}
								>
									<PencilSquareIcon className="size-4" aria-hidden="true" />
								</button>
							</td>
						</tr>
					);
				}}
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
