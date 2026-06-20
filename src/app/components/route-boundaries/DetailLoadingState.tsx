const STAT_KEYS = Array.from({ length: 3 }, (_, index) => `stat-${index}`);
const ROW_KEYS = Array.from({ length: 4 }, (_, index) => `row-${index}`);

interface Props {
	title: string;
	showBackAction?: boolean;
	showSidebar?: boolean;
}

export default function DetailLoadingState({
	title,
	showBackAction = false,
	showSidebar = false,
}: Props) {
	return (
		<div
			className="w-full max-w-7xl space-y-6 px-4 pb-12 pt-2 sm:px-6 lg:px-8"
			aria-busy="true"
			aria-live="polite"
		>
			<span className="sr-only">{title}</span>
			{showBackAction && <div className="skeleton h-8 w-24" />}
			<div
				className={
					showSidebar
						? "grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(21rem,0.38fr)]"
						: undefined
				}
			>
				<div className="space-y-6">
					<section className="card border border-base-300 bg-base-100 shadow-sm">
						<div className="card-body gap-6">
							<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
								<div className="space-y-3">
									<div className="skeleton h-4 w-32" />
									<div className="skeleton h-9 w-72 max-w-full" />
									<div className="skeleton h-4 w-full max-w-xl" />
								</div>
								<div className="skeleton h-6 w-20 rounded-full" />
							</div>
							<div className="stats stats-vertical w-full border border-base-300 bg-base-200/50 lg:stats-horizontal">
								{STAT_KEYS.map((key) => (
									<div key={key} className="stat">
										<div className="skeleton h-3 w-24" />
										<div className="skeleton mt-3 h-8 w-32" />
									</div>
								))}
							</div>
						</div>
					</section>
					<section className="space-y-4">
						<div className="space-y-2">
							<div className="skeleton h-7 w-40" />
							<div className="skeleton h-4 w-80 max-w-full" />
						</div>
						<div className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
							{ROW_KEYS.map((key) => (
								<div
									key={key}
									className="grid gap-4 border-b border-base-300 px-4 py-5 last:border-b-0 sm:grid-cols-3"
								>
									<div className="skeleton h-5 w-40 max-w-full" />
									<div className="skeleton h-5 w-24" />
									<div className="skeleton h-5 w-20" />
								</div>
							))}
						</div>
					</section>
				</div>
				{showSidebar && (
					<aside className="xl:sticky xl:top-24">
						<div className="space-y-4 rounded-box border border-base-300 bg-base-100 p-4 shadow-sm">
							<div className="skeleton h-6 w-28" />
							<div className="skeleton h-12 w-full" />
							<div className="skeleton h-12 w-full" />
							<div className="skeleton h-24 w-full" />
							<div className="skeleton h-40 w-full" />
						</div>
					</aside>
				)}
			</div>
		</div>
	);
}
