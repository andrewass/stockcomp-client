import AvailableContests from "@/symbols/contestlist/AvailableContests.tsx";
import SignedUpContests from "@/symbols/contestlist/SignedUpContests.tsx";
import type { SymbolContestListItemViewModel } from "@/symbols/domain.ts";

interface Props {
	registeredContests: SymbolContestListItemViewModel[];
	unregisteredContests: SymbolContestListItemViewModel[];
}

export default function ContestList({
	registeredContests,
	unregisteredContests,
}: Props) {
	return (
		<div className="space-y-8 rounded-box border border-base-300 bg-base-200/70 p-4 shadow-sm">
			<SignedUpContests contests={registeredContests} />
			<AvailableContests contests={unregisteredContests} />
		</div>
	);
}
