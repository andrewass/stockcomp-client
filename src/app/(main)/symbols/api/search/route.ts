import { searchSymbols } from "@/symbols/overview/search/symbolSearchData.ts";

export function GET(request: Request): Response {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("query") ?? "";

	return Response.json(searchSymbols(query));
}
