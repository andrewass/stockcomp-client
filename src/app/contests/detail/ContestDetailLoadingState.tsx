const METRIC_KEYS = Array.from({ length: 4 }, (_, index) => `metric-${index}`);
const ROW_KEYS = Array.from({ length: 5 }, (_, index) => `row-${index}`);

export default function ContestDetailLoadingState() {
	return (
		<div
			className="w-full max-w-6xl space-y-7"
			aria-busy="true"
			aria-live="polite"
		>
			<span className="sr-only">Loading contest details…</span>
			<section className="card border border-base-300 bg-base-100 shadow-sm">
				<div className="card-body gap-5">
					<div className="flex items-start justify-between gap-4">
						<div className="space-y-2">
							<div className="skeleton h-3 w-20" />
							<div className="skeleton h-9 w-72 max-w-full" />
						</div>
						<div className="skeleton h-6 w-20 rounded-full" />
					</div>
					<div className="flex flex-wrap gap-5 border-t border-base-300 pt-4">
						<div className="skeleton h-4 w-44" />
						<div className="skeleton h-4 w-44" />
						<div className="skeleton h-4 w-28" />
					</div>
				</div>
			</section>

			<section className="space-y-4">
				<div className="space-y-2">
					<div className="skeleton h-7 w-36" />
					<div className="skeleton h-4 w-80 max-w-full" />
				</div>
				<div className="grid gap-px overflow-hidden rounded-box border border-base-300 bg-base-300 sm:grid-cols-2 lg:grid-cols-4">
					{METRIC_KEYS.map((key) => (
						<div key={key} className="space-y-3 bg-base-100 px-5 py-4">
							<div className="skeleton h-3 w-20" />
							<div className="skeleton h-7 w-32" />
							<div className="skeleton h-3 w-28" />
						</div>
					))}
				</div>
			</section>

			<section className="space-y-4">
				<div className="flex h-12 items-center gap-6 border-b border-base-300 px-4">
					<div className="skeleton h-4 w-28" />
					<div className="skeleton h-4 w-24" />
					<div className="skeleton h-4 w-20" />
				</div>
				<div className="overflow-hidden rounded-box border border-base-300 bg-base-100">
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
			<div aria-hidden="true" className="h-24" />
		</div>
	);
}
