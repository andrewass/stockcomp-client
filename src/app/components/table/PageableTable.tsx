import type React from "react";
import TablePager from "@/components/table/TablePager.tsx";

export function parseParams(
	pageNumber: string,
	searchParams: { [key: string]: string | string[] | undefined },
): { pageNumber: number; pageSize: number } | null {
	const parsedPageNumber = parseInt(pageNumber, 10);
	const parsedPageSize = searchParams.pageSize
		? parseInt(String(searchParams.pageSize), 10)
		: 10;

	if (isNaN(parsedPageNumber) || isNaN(parsedPageSize)) {
		return null;
	}
	return { pageNumber: parsedPageNumber, pageSize: parsedPageSize };
}

type Identifiable = {
	id: string | number;
};

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
	const totalPages = pageSize > 0 ? Math.ceil(totalEntriesCount / pageSize) : 0;

	return (
		<div className="border border-base-300 w-300">
			<table className="table">
				<thead>
					<tr className="bg-base-300">
						{headerItems.map((item, index) => (
							<th key={index}>{item}</th>
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
				pageSize={pageSize}
				basePath={basePath}
			/>
		</div>
	);
}
