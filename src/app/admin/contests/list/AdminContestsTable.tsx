import { PencilSquareIcon } from "@heroicons/react/24/outline";
import PageableTable from "@/components/table/PageableTable.tsx";
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

type ContestTableEntry = Contest & {
	id: number;
};

export default function AdminContestsTable({
	contests,
	pageSize,
	currentPage,
	totalEntriesCount,
	onEditContest,
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
				renderRow={(contest) => {
					const isCompleted =
						contest.contestStatus === CONTEST_STATUS.COMPLETED;

					return (
						<tr key={contest.id}>
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
		</div>
	);
}
