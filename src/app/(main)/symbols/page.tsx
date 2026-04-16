import { SymbolsLandingView } from "@/symbols/SymbolsLandingView.tsx";
import {
	openSignUpContests,
	signedUpContests,
	trendingSymbols,
} from "@/symbols/symbolsLandingData.ts";

export default function SymbolsPage() {
	return (
		<SymbolsLandingView
			symbols={trendingSymbols}
			signedUpContests={signedUpContests}
			openContests={openSignUpContests}
		/>
	);
}
