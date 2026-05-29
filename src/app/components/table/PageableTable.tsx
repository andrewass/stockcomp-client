import type React from "react";
import {
	DEFAULT_PAGE_SIZE,
	MAX_PAGE_SIZE,
} from "@/components/table/paginationParams.ts";
import TablePager from "@/components/table/TablePager.tsx";

interface Identifiable {
	id: string | number;
}

interface Props<T extends Identifiable> {
	items: T[];
	pageSize: number;
	currentPage: number;
	totalEntriesCount: number;
	basePath: string;
	headerItems: string[];
	renderRow: (item: T) => React.ReactNode;
}

export default function PageableTable<T extends Identifiable>({
	items,
	pageSize,
	currentPage,
	totalEntriesCount,
	basePath,
	renderRow,
	headerItems,
}: Props<T>) {
	const safePageSize =
		Number.isFinite(pageSize) && pageSize >= 1
			? Math.min(Math.floor(pageSize), MAX_PAGE_SIZE)
			: DEFAULT_PAGE_SIZE;
	const totalPages =
		totalEntriesCount > 0 ? Math.ceil(totalEntriesCount / safePageSize) : 0;

	return (
		<div className="w-300 max-w-full overflow-x-auto border border-base-300">
			<table className="table w-full min-w-[48rem]">
				<thead>
					<tr className="bg-base-300">
						{headerItems.map((item) => (
							<th key={item}>{item}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{items.length > 0 ? (
						items.map((item) => renderRow(item))
					) : (
						<tr>
							<td colSpan={headerItems.length} className="text-center">
								No items
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<TablePager
				currentPage={currentPage}
				totalPages={totalPages}
				pageSize={safePageSize}
				basePath={basePath}
			/>
		</div>
	);
}
