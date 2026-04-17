import ContestSection from "@/symbols/contestlist/ContestSection.tsx";
import type { SymbolContestListItemViewModel } from "@/symbols/symbolTypes.ts";

interface Props {
	contests: SymbolContestListItemViewModel[];
}

export default function SignedUpContests({ contests }: Props) {
	return (
		<ContestSection
			title="Signed Up"
			emptyMessage="You have not joined any contests yet."
			contests={contests}
		/>
	);
}
