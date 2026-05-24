import type { SymbolContestListItemViewModel } from "@/symbols/domain.ts";
import ContestSection from "@/symbols/overview/contests/ContestSection.tsx";

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
