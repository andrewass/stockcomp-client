interface Props {
	title: string;
	columnCount?: number;
	rowCount?: number;
	showActionSkeleton?: boolean;
}

export default function TableLoadingState({
	title,
	columnCount = 6,
	rowCount = 6,
	showActionSkeleton = false,
}: Props) {
	const columnKeys = Array.from(
		{ length: columnCount },
		(_, index) => `column-${index}`,
	);
	const rowKeys = Array.from(
		{ length: rowCount },
		(_, index) => `row-${index}`,
	);

	return (
		<div className="space-y-4" aria-busy="true" aria-live="polite">
			<span className="sr-only">{title}</span>
			{showActionSkeleton ? (
				<div className="flex min-h-12 flex-col justify-end gap-3 sm:flex-row sm:items-end sm:justify-between">
					<div className="space-y-2">
						<div className="skeleton h-3 w-24" />
						<div className="skeleton h-7 w-56 max-w-full" />
					</div>
					<div className="skeleton h-10 w-32 rounded-btn" />
				</div>
			) : (
				<div className="min-h-12" aria-hidden="true" />
			)}
			<div className="w-300 max-w-full overflow-x-auto border border-base-300">
				<table className="table w-full min-w-[48rem]">
					<thead>
						<tr className="bg-base-300">
							{columnKeys.map((key, index) => (
								<th key={key}>
									<div
										className={`skeleton h-3 ${index === 1 ? "w-20" : "w-16"}`}
									/>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rowKeys.map((rowKey) => (
							<tr key={rowKey}>
								{columnKeys.map((columnKey, index) => (
									<td key={`${rowKey}-${columnKey}`}>
										<div
											className={`skeleton h-5 ${
												index === 1 ? "w-36 max-w-full" : "w-20"
											}`}
										/>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
				<div className="flex items-center justify-end border-t border-base-300 bg-base-200/40 px-4 py-3">
					<div className="flex items-center gap-2">
						<div className="skeleton size-8 rounded-full" />
						<div className="skeleton size-8 rounded-full" />
						<div className="skeleton h-5 w-14" />
						<div className="skeleton size-8 rounded-full" />
						<div className="skeleton size-8 rounded-full" />
					</div>
				</div>
			</div>
		</div>
	);
}
