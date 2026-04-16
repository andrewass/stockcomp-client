import AvailableContests from "@/symbols/contestlist/AvailableContests.tsx";
import SignedUpContests from "@/symbols/contestlist/SignedUpContests.tsx";
import type { SymbolContestListItemViewModel } from "@/symbols/symbolTypes.ts";

interface Props {
	signedUpContests: SymbolContestListItemViewModel[];
	openContests: SymbolContestListItemViewModel[];
}

export default function ContestList({
	signedUpContests,
	openContests,
}: Props) {
	return (
		<div className="space-y-4 rounded-box border border-base-300 bg-base-200/70 p-4 shadow-sm">
			<div className="space-y-2 border-b border-base-300/80 pb-4">
				<p className="text-xs font-semibold uppercase tracking-[0.3em] text-base-content/55">
					Contest Rail
				</p>
				<h2 className="text-xl font-semibold tracking-tight">
					Keep your next move visible.
				</h2>
				<p className="text-sm leading-6 text-base-content/70">
					Watch what you are already in, then scan upcoming sign-up windows
					without leaving the symbols overview.
				</p>
			</div>
			<SignedUpContests contests={signedUpContests} />
			<AvailableContests contests={openContests} />
		</div>
	);
}
