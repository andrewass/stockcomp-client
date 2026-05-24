import { getTrendingSymbolsData } from "@/symbols/overview/symbols-grid/symbolsData.ts";

export async function GET(): Promise<Response> {
	const symbols = await getTrendingSymbolsData();
	return Response.json(symbols);
}
