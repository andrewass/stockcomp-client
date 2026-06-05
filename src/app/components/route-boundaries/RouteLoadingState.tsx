interface Props {
	title: string;
	eyebrow?: string;
	rowCount?: number;
	showActionSkeleton?: boolean;
}

export default function RouteLoadingState({
	title,
	eyebrow = "Loading",
	rowCount = 6,
	showActionSkeleton = false,
}: Props) {
	const rowKeys = Array.from(
		{ length: rowCount },
		(_, index) => `row-${index}`,
	);

	return (
		<div
			className="w-full max-w-6xl space-y-4"
			aria-busy="true"
			aria-live="polite"
		>
			<span className="sr-only">{title}</span>
			<div className="flex min-h-12 flex-col justify-end gap-3 sm:flex-row sm:items-end sm:justify-between">
				<div className="space-y-2">
					<div className="skeleton h-3 w-24" />
					<div className="skeleton h-7 w-56 max-w-full" />
				</div>
				{showActionSkeleton ? (
					<div className="skeleton h-10 w-32 rounded-btn" />
				) : (
					<div className="hidden sm:block" aria-hidden="true" />
				)}
			</div>
			<section className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
				<div className="border-b border-base-300 bg-base-200/50 px-4 py-3">
					<div className="flex items-center justify-between gap-4">
						<div>
							<p className="text-xs font-medium uppercase tracking-[0.18em] text-base-content/50">
								{eyebrow}
							</p>
							<div className="skeleton mt-2 h-5 w-40" />
						</div>
						<div className="skeleton h-8 w-24" />
					</div>
				</div>
				<div className="divide-y divide-base-300">
					{rowKeys.map((key) => (
						<div
							key={key}
							className="grid gap-4 px-4 py-4 sm:grid-cols-[minmax(10rem,1.5fr)_repeat(3,minmax(5rem,0.7fr))]"
						>
							<div className="space-y-2">
								<div className="skeleton h-5 w-44 max-w-full" />
								<div className="skeleton h-3 w-28" />
							</div>
							<div className="skeleton h-5 w-20" />
							<div className="skeleton h-5 w-24" />
							<div className="skeleton h-5 w-16" />
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
