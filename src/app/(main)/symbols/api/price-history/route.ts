import { toRouteErrorResponse } from "@/api/routeHandlerResponses.ts";
import { getSymbolPriceHistoryData } from "@/symbols/detail/price-history/priceHistoryData.ts";
import { parsePriceHistoryPeriod } from "@/symbols/detail/price-history/priceHistoryPeriods.ts";

function getSymbolFromRequest(request: Request): string | null {
	const { searchParams } = new URL(request.url);
	const symbol = searchParams.get("symbol")?.trim().toUpperCase();

	return symbol ? symbol : null;
}

function getPeriodFromRequest(request: Request) {
	const { searchParams } = new URL(request.url);
	return parsePriceHistoryPeriod(searchParams.get("period") ?? undefined);
}

function toErrorResponse(error: unknown): Response {
	return toRouteErrorResponse(error, {
		message: "Unable to load price history.",
	});
}

export async function GET(request: Request): Promise<Response> {
	const symbol = getSymbolFromRequest(request);
	if (!symbol) {
		return Response.json({ message: "symbol is required." }, { status: 400 });
	}

	try {
		const priceHistory = await getSymbolPriceHistoryData(
			symbol,
			getPeriodFromRequest(request),
		);
		return Response.json(priceHistory);
	} catch (error) {
		return toErrorResponse(error);
	}
}
