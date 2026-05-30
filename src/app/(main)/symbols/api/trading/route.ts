import { toRouteErrorResponse } from "@/api/routeHandlerResponses.ts";
import { getSymbolTradingData } from "@/symbols/detail/trading/tradingData.ts";

function getSymbolFromRequest(request: Request): string | null {
	const { searchParams } = new URL(request.url);
	const symbol = searchParams.get("symbol")?.trim().toUpperCase();

	return symbol ? symbol : null;
}

function toErrorResponse(error: unknown): Response {
	return toRouteErrorResponse(error, {
		message: "Unable to load symbol trading data.",
	});
}

export async function GET(request: Request): Promise<Response> {
	const symbol = getSymbolFromRequest(request);
	if (!symbol) {
		return Response.json({ message: "symbol is required." }, { status: 400 });
	}

	try {
		const tradingData = await getSymbolTradingData(symbol);
		return Response.json(tradingData);
	} catch (error) {
		return toErrorResponse(error);
	}
}
