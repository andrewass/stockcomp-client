import { isApiHttpStatusError } from "@/api/httpClient.ts";
import { isUnauthenticatedError } from "@/api/resourceServerClient.ts";
import { getSymbolTradingData } from "@/symbols/api/tradingData.ts";

function getSymbolFromRequest(request: Request): string | null {
	const { searchParams } = new URL(request.url);
	const symbol = searchParams.get("symbol")?.trim().toUpperCase();

	return symbol ? symbol : null;
}

function toErrorResponse(error: unknown): Response {
	if (isUnauthenticatedError(error)) {
		return Response.json(
			{ message: "Authentication required." },
			{ status: 401 },
		);
	}

	if (isApiHttpStatusError(error, 400) || isApiHttpStatusError(error, 404)) {
		return Response.json(
			{ message: "Unable to load symbol trading data." },
			{ status: error.status },
		);
	}

	return Response.json(
		{ message: "Unable to load symbol trading data." },
		{ status: 502 },
	);
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
