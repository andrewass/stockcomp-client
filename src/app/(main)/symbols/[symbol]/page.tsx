import { notFound } from "next/navigation";
import SymbolDetailView from "@/symbols/SymbolDetailView.tsx";
import { getSymbolDetailData } from "@/symbols/symbolDetailData.ts";

interface Props {
	params: Promise<{ symbol: string }>;
}

export default async function SymbolDetailsPage({ params }: Props) {
	const { symbol } = await params;
	const symbolDetail = await getSymbolDetailData(symbol);

	if (symbolDetail === null) {
		notFound();
	}

	return <SymbolDetailView symbolDetail={symbolDetail} />;
}
