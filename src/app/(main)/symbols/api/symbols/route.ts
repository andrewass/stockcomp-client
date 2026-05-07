import { getTrendingSymbolsData } from "@/symbols/api/symbolsData.ts";

export async function GET(): Promise<Response> {
	const symbols = await getTrendingSymbolsData();
	return Response.json(symbols);
}
