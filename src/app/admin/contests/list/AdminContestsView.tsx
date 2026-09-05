import type { Contest } from "@/domain/contests/contestTypes.ts";
import CreateContestButton from "../create/CreateContestButton.tsx";
import AdminContestsTable from "./AdminContestsTable.tsx";

interface Props {
	contests: Contest[];
	pageSize: number;
	currentPage: number;
	totalEntriesCount: number;
}

export default function AdminContestsView({
	contests,
	pageSize,
	currentPage,
	totalEntriesCount,
}: Props) {
	return (
		<div className="space-y-4">
			<div className="flex min-h-12 items-center justify-end">
				<CreateContestButton />
			</div>
			<AdminContestsTable
				contests={contests}
				pageSize={pageSize}
				currentPage={currentPage}
				totalEntriesCount={totalEntriesCount}
			/>
		</div>
	);
}
