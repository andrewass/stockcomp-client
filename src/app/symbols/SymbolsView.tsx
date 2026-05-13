import {
	getRegisteredContests,
	getUnregisteredContests,
} from "@/symbols/api/contestsData.ts";
import ContestList from "@/symbols/contestlist/ContestList.tsx";
import { SymbolsGrid } from "@/symbols/symbolgrid/SymbolsGrid.tsx";

export async function SymbolsView() {
	const [unregisteredContests, registeredContests] = await Promise.all([
		getUnregisteredContests(),
		getRegisteredContests(),
	]);

	return (
		<div className="w-full max-w-7xl px-4 pb-12 pt-2 sm:px-6 lg:px-8">
			<div className="grid items-start gap-6 xl:gap-12 xl:grid-cols-[minmax(0,3fr)_minmax(18rem,1fr)]">
				<section className="space-y-6">
					<div className="relative overflow-hidden rounded-box border border-base-300 bg-base-200/80 p-6 shadow-sm">
						<div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-linear-to-l from-primary/10 via-transparent to-transparent lg:block" />
						<div className="relative">
							<div className="max-w-3xl space-y-3">
								<p className="text-xs font-semibold uppercase tracking-[0.32em] text-base-content/60">
									Market Snapshot
								</p>
								<div className="space-y-2">
									<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
										Quick signals before you dive into the grid.
									</h1>
									<p className="max-w-2xl text-sm leading-6 text-base-content/70 sm:text-base">
										Use the snapshot to gauge market direction, see how many
										contests are already on your radar, and catch the next
										starting window without scanning the full page first.
									</p>
								</div>
							</div>
						</div>
					</div>
					<SymbolsGrid />
				</section>
				<aside className="xl:sticky xl:top-24 xl:self-start">
					<ContestList
						registeredContests={registeredContests}
						unregisteredContests={unregisteredContests}
					/>
				</aside>
			</div>
		</div>
	);
}
