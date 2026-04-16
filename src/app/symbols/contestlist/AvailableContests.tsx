import ContestSection from "@/symbols/contestlist/ContestSection.tsx";
import type { SymbolContestListItemViewModel } from "@/symbols/symbolTypes.ts";

interface Props {
	contests: SymbolContestListItemViewModel[];
}

export default function AvailableContests({ contests }: Props) {
	return (
		<ContestSection
			title="Open For Sign Up"
			description="Upcoming contests that still accept participants."
			emptyMessage="No new contests are open for sign-up right now."
			contests={contests}
		/>
	);
}
