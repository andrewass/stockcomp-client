import type { Contest } from "@/contest/contestTypes.ts";
import ContestTable from "./ContestTable.tsx";

interface Props {
	contests: Contest[];
	pageSize: number;
	currentPage: number;
	totalEntriesCount: number;
}

export default function ContestView({
	contests,
	pageSize,
	currentPage,
	totalEntriesCount,
}: Props) {
	return (
		<div className="space-y-4">
			<div
				className="flex min-h-12 items-center justify-end"
				aria-hidden="true"
			/>
			<ContestTable
				contests={contests}
				pageSize={pageSize}
				currentPage={currentPage}
				totalEntriesCount={totalEntriesCount}
			/>
		</div>
	);
}
