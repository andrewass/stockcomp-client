import type React from "react";

interface Identifiable {
	id: string | number;
}

interface ColumnDefinition {
	id: string;
	className: string;
}

interface Props<T extends Identifiable> {
	items: T[];
	headerItems: string[];
	columnDefinitions?: readonly ColumnDefinition[];
	compact?: boolean;
	pagination?: React.ReactNode;
	renderRow: (item: T) => React.ReactNode;
}

export default function PageableTable<T extends Identifiable>({
	items,
	renderRow,
	headerItems,
	columnDefinitions,
	compact = false,
	pagination,
}: Props<T>) {
	return (
		<div className="w-300 max-w-full overflow-x-auto border border-base-300">
			<table
				className={`table w-full min-w-[48rem] ${compact ? "table-sm" : ""} ${columnDefinitions ? "table-fixed" : ""}`}
			>
				{columnDefinitions ? (
					<colgroup>
						{columnDefinitions.map((column) => (
							<col key={column.id} className={column.className} />
						))}
					</colgroup>
				) : null}
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
			{pagination}
		</div>
	);
}
