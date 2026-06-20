const CARD_KEYS = Array.from({ length: 6 }, (_, index) => `card-${index}`);
const SIDEBAR_KEYS = Array.from(
	{ length: 3 },
	(_, index) => `sidebar-${index}`,
);

export default function GridLoadingState() {
	return (
		<div
			className="w-full max-w-7xl px-4 pb-12 pt-2 sm:px-6 lg:px-8"
			aria-busy="true"
			aria-live="polite"
		>
			<span className="sr-only">Loading market overview</span>
			<div className="grid items-start gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(18rem,1fr)] xl:gap-12">
				<section className="space-y-6">
					<div className="skeleton h-12 w-full rounded-box" />
					<div className="rounded-box border border-base-300 bg-base-200/80 p-6 shadow-sm">
						<div className="space-y-3">
							<div className="skeleton h-3 w-32" />
							<div className="skeleton h-9 w-3/4 max-w-xl" />
							<div className="skeleton h-4 w-full max-w-2xl" />
							<div className="skeleton h-4 w-2/3 max-w-lg" />
						</div>
					</div>
					<div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
						{CARD_KEYS.map((key) => (
							<div
								key={key}
								className="rounded-box border border-base-300 bg-base-100 p-5 shadow-sm"
							>
								<div className="flex h-full flex-col gap-5">
									<div className="flex items-start justify-between gap-3">
										<div className="flex-1 space-y-2">
											<div className="skeleton h-3 w-20" />
											<div className="skeleton h-6 w-3/4" />
										</div>
										<div className="skeleton h-5 w-12 rounded-full" />
									</div>
									<div className="space-y-3">
										<div className="skeleton h-9 w-36" />
										<div className="skeleton h-8 w-40 rounded-full" />
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
				<aside className="space-y-4 xl:sticky xl:top-24">
					<div className="skeleton h-7 w-36" />
					{SIDEBAR_KEYS.map((key) => (
						<div
							key={key}
							className="rounded-box border border-base-300 bg-base-100 p-4 shadow-sm"
						>
							<div className="skeleton h-5 w-3/4" />
							<div className="skeleton mt-3 h-3 w-1/2" />
							<div className="skeleton mt-5 h-8 w-full" />
						</div>
					))}
				</aside>
			</div>
		</div>
	);
}
