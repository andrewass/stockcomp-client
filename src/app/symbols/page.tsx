"use client";

import ContestList from "@/symbols/contestlist/ContestList.tsx";
import { SymbolsGrid } from "@/symbols/symbolgrid/SymbolsGrid.tsx";

export default function SymbolsPage() {
	return (
		<div className="flex flex-row gap-80">
			<SymbolsGrid />
			<ContestList />
		</div>
	);
}
