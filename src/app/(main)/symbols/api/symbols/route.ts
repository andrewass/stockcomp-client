import { toRouteErrorResponse } from "@/api/routeHandlerResponses.ts";
import { getTrendingSymbolsData } from "@/symbols/overview/symbols-grid/symbolsData.ts";

export async function GET(): Promise<Response> {
	try {
		const symbols = await getTrendingSymbolsData();
		return Response.json(symbols);
	} catch (error) {
		return toRouteErrorResponse(error, {
			message: "Unable to load symbols.",
		});
	}
}
