const STAT_KEYS = Array.from({ length: 7 }, (_, index) => `stat-${index}`);
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
			{showBackAction ? <div className="skeleton h-8 w-24" /> : null}
			<section className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
				<div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-start lg:justify-between">
					<div className="space-y-3">
						<div className="skeleton h-5 w-24" />
						<div className="skeleton h-10 w-72 max-w-full" />
					</div>
					<div className="space-y-3 lg:text-right">
						<div className="skeleton h-9 w-40" />
						<div className="skeleton h-8 w-28 lg:ml-auto" />
					</div>
				</div>
				<div className="grid gap-px border-t border-base-300 bg-base-300 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
					{STAT_KEYS.map((key) => (
						<div key={key} className="space-y-2 bg-base-200 px-5 py-4">
							<div className="skeleton h-3 w-20" />
							<div className="skeleton h-5 w-24" />
						</div>
					))}
				</div>
			</section>
			<div
				className={
					showSidebar
						? "grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(21rem,0.38fr)]"
						: undefined
				}
			>
				<div className="min-w-0">
					<section className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
						<div className="space-y-3">
							<div className="skeleton h-4 w-32" />
							<div className="skeleton h-8 w-56 max-w-full" />
							<div className="skeleton h-8 w-72 max-w-full" />
							<div className="skeleton h-80 w-full" />
						</div>
					</section>
				</div>
				{showSidebar ? (
					<aside className="xl:sticky xl:top-24">
						<div className="space-y-4 rounded-box border border-primary/25 bg-base-100 p-5 shadow-sm">
							<div className="skeleton h-6 w-28" />
							<div className="skeleton h-12 w-full" />
							<div className="skeleton h-12 w-full" />
							<div className="skeleton h-24 w-full" />
							<div className="skeleton h-40 w-full" />
						</div>
					</aside>
				) : null}
			</div>
			{showSidebar ? (
				<section className="space-y-4 rounded-box border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
					<div className="space-y-2">
						<div className="skeleton h-4 w-32" />
						<div className="skeleton h-8 w-72 max-w-full" />
						<div className="skeleton h-4 w-96 max-w-full" />
					</div>
					<div className="overflow-hidden rounded-box border border-base-300">
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
			) : null}
		</div>
	);
}
