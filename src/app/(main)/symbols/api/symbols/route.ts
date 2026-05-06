import { getTrendingSymbolsPageData } from "@/symbols/api/symbols/symbolsData.ts";

export async function GET(): Promise<Response> {
	const symbols = await getTrendingSymbolsPageData();
	return Response.json(symbols);
}
