import ContestSection from "@/symbols/contestlist/ContestSection.tsx";
import type { SymbolContestListItemViewModel } from "@/symbols/domain.ts";

interface Props {
	contests: SymbolContestListItemViewModel[];
}

export default function AvailableContests({ contests }: Props) {
	return (
		<ContestSection
			title="Open For Sign Up"
			emptyMessage="No new contests are open for sign-up right now."
			contests={contests}
			showSignUpAction
		/>
	);
}
