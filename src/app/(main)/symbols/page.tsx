import { SymbolsView } from "../../symbols/SymbolsView.tsx";
import {
	openSignUpContests,
	signedUpContests,
} from "@/symbols/api/symbolsLandingData.ts";

export default function SymbolsPage() {
	return (
		<SymbolsView
			signedUpContests={signedUpContests}
			openContests={openSignUpContests}
		/>
	);
}
