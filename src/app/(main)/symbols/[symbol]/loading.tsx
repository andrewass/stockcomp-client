const METRIC_SKELETON_KEYS = [
	"market-cap",
	"pe",
	"pb",
	"eps",
	"dividend-rate",
	"dividend-yield",
];

export default function SymbolDetailsLoading() {
	return (
		<div
			className="w-full max-w-7xl space-y-6 px-4 pb-12 pt-2 sm:px-6 lg:px-8"
			aria-busy="true"
			aria-label="Loading symbol details"
		>
			<div className="skeleton h-8 w-24" />

			<div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(21rem,0.38fr)]">
				<div className="space-y-6">
					<section className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
						<div className="grid gap-0 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.75fr)]">
							<div className="space-y-8 p-6 sm:p-8">
								<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
									<div className="space-y-3">
										<div className="flex flex-wrap items-center gap-2">
											<div className="skeleton h-6 w-16 rounded-full" />
											<div className="skeleton h-6 w-14 rounded-full" />
										</div>
										<div className="space-y-2">
											<div className="skeleton h-10 w-72 max-w-full" />
										</div>
									</div>
									<div className="skeleton h-6 w-20 rounded-full" />
								</div>

								<div className="stats stats-vertical w-full border border-base-300 bg-base-200/50 lg:stats-horizontal">
									<div className="stat">
										<div className="stat-title">Current price</div>
										<div className="skeleton mt-2 h-9 w-32" />
									</div>
									<div className="stat">
										<div className="stat-title">Daily change</div>
										<div className="skeleton mt-2 h-8 w-28" />
									</div>
									<div className="stat">
										<div className="stat-title">USD price</div>
										<div className="skeleton mt-2 h-8 w-28" />
									</div>
								</div>
							</div>

							<div className="border-t border-base-300 bg-base-200/60 p-6 lg:border-l lg:border-t-0 sm:p-8">
								<div className="grid grid-cols-2 gap-3">
									{METRIC_SKELETON_KEYS.map((key) => (
										<div
											key={key}
											className="rounded-box border border-base-300 bg-base-100 p-4"
										>
											<div className="skeleton h-3 w-20" />
											<div className="skeleton mt-3 h-7 w-24" />
										</div>
									))}
								</div>
							</div>
						</div>
					</section>

					<section className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
						<div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
							<div>
								<p className="text-sm font-medium uppercase tracking-[0.2em] text-base-content/55">
									Price history
								</p>
								<div className="skeleton mt-2 h-8 w-44" />
							</div>
							<div className="skeleton h-6 w-10 rounded-full" />
						</div>
						<div className="h-80 min-h-80 w-full min-w-0 rounded-box border border-dashed border-base-300 bg-base-200/50">
							<div className="flex h-full items-center justify-center">
								<div className="loading loading-spinner loading-md text-primary" />
							</div>
						</div>
					</section>
				</div>
				<aside className="xl:sticky xl:top-24 xl:self-start">
					<div className="space-y-4 rounded-box border border-base-300 bg-base-100 p-4 shadow-sm">
						<div className="flex items-start justify-between gap-3">
							<div>
								<div className="skeleton h-6 w-20" />
								<div className="skeleton mt-2 h-4 w-36" />
							</div>
							<div className="skeleton size-5 rounded-full" />
						</div>
						<div className="skeleton h-12 w-full" />
						<div className="skeleton h-12 w-full" />
						<div className="skeleton h-24 w-full" />
						<div className="divider my-2" />
						<div className="space-y-3">
							<div className="skeleton h-5 w-28" />
							<div className="skeleton h-40 w-full" />
							<div className="skeleton h-40 w-full" />
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
}
