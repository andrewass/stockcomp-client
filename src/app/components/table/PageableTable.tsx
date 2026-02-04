import type React from "react";

type Identifiable = {
	id: string | number;
};

type Props<T extends Identifiable> = {
	items: T[];
	pageSize: number;
	currentPage: number;
	headerItems: string[];
	renderRow: (item: T) => React.ReactNode;
};

export default function PageableTable<T extends Identifiable>({
	items,
	currentPage,
	pageSize,
	renderRow,
	headerItems,
}: Props<T>) {
	return (
		<div className="border border-base-300 w-300">
			<table className="table">
				<thead>
					<tr className="bg-base-300">
						{headerItems.map((item) => (
							<th>{item}</th>
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
