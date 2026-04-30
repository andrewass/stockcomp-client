import { SymbolsView } from "../../symbols/SymbolsView.tsx";
import {
	openSignUpContests,
	signedUpContests,
	trendingSymbols,
} from "@/symbols/symbolsLandingData.ts";

export default function SymbolsPage() {
	return (
		<SymbolsView
			symbols={trendingSymbols}
			signedUpContests={signedUpContests}
			openContests={openSignUpContests}
		/>
	);
}
