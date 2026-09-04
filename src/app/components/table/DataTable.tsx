import type { ReactNode } from "react";

interface ColumnDefinition {
	id: string;
	className: string;
}

interface TableFrameProps {
	children: ReactNode;
}

interface Props<T> {
	items: readonly T[];
	headerItems: readonly string[];
	columnDefinitions?: readonly ColumnDefinition[];
	density?: "comfortable" | "compact";
	renderRow: (item: T) => ReactNode;
}

export function TableFrame({ children }: TableFrameProps) {
	return (
		<div className="w-300 max-w-full overflow-hidden border border-base-300">
			{children}
		</div>
	);
}

export default function DataTable<T>({
	items,
	renderRow,
	headerItems,
	columnDefinitions,
	density = "comfortable",
}: Props<T>) {
	return (
		<div className="overflow-x-auto">
			<table
				className={`table w-full min-w-[48rem] ${density === "compact" ? "table-sm" : ""} ${columnDefinitions ? "table-fixed" : ""}`}
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
		</div>
	);
}
