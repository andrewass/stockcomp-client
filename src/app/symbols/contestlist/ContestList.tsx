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
		<div className="space-y-8 rounded-box border border-base-300 bg-base-200/70 p-4 shadow-sm">
			<SignedUpContests contests={signedUpContests} />
			<AvailableContests contests={openContests} />
		</div>
	);
}
