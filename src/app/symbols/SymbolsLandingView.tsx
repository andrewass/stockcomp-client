import ContestList from "@/symbols/contestlist/ContestList.tsx";
import { SymbolsGrid } from "@/symbols/symbolgrid/SymbolsGrid.tsx";
import type {
	SymbolCardViewModel,
	SymbolContestListItemViewModel,
} from "@/symbols/symbolTypes.ts";

interface Props {
	symbols: SymbolCardViewModel[];
	signedUpContests: SymbolContestListItemViewModel[];
	openContests: SymbolContestListItemViewModel[];
}

export function SymbolsLandingView({
	symbols,
	signedUpContests,
	openContests,
}: Props) {
	return (
		<div className="w-full max-w-7xl px-4 pb-12 pt-2 sm:px-6 lg:px-8">
			<div className="grid items-start gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(18rem,1fr)]">
				<section className="space-y-6">
					<div className="relative overflow-hidden rounded-box border border-base-300 bg-base-200/80 p-6 shadow-sm">
						<div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-primary/10 via-transparent to-transparent lg:block" />
						<div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
							<div className="max-w-3xl space-y-3">
								<p className="text-xs font-semibold uppercase tracking-[0.32em] text-base-content/60">
									Market Snapshot
								</p>
								<div className="space-y-2">
									<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
										Discover symbols while keeping contests in view.
									</h1>
									<p className="max-w-2xl text-sm leading-6 text-base-content/70 sm:text-base">
										Use this surface as the quick-glance hub for popular
										tickers, current price moves, and the contests you can
										join next.
									</p>
								</div>
							</div>
							<div className="stats stats-vertical border border-base-300 bg-base-100 shadow-sm sm:stats-horizontal">
								<div className="stat px-4 py-3">
									<div className="stat-title">Tracked Symbols</div>
									<div className="stat-value text-2xl">{symbols.length}</div>
								</div>
								<div className="stat px-4 py-3">
									<div className="stat-title">Joined Contests</div>
									<div className="stat-value text-2xl">
										{signedUpContests.length}
									</div>
								</div>
								<div className="stat px-4 py-3">
									<div className="stat-title">Open Sign-up</div>
									<div className="stat-value text-2xl">
										{openContests.length}
									</div>
								</div>
							</div>
						</div>
					</div>
					<SymbolsGrid symbols={symbols} />
				</section>
				<aside className="xl:sticky xl:top-24 xl:self-start">
					<ContestList
						signedUpContests={signedUpContests}
						openContests={openContests}
					/>
				</aside>
			</div>
		</div>
	);
}
