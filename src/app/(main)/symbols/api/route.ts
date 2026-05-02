import { getTrendingSymbolsPageData } from "@/symbols/api/symbolsData.ts";

export async function GET(): Promise<Response> {
	const symbols = await getTrendingSymbolsPageData();
	return Response.json(symbols);
}
