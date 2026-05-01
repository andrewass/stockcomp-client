import { NextResponse } from "next/server";
import { getTrendingSymbolsPageData } from "@/symbols/symbolsData.ts";

export async function GET(): Promise<Response> {
	try {
		const symbols = await getTrendingSymbolsPageData();
		return NextResponse.json({ symbols });
	} catch {
		return NextResponse.json(
			{
				error: {
					message: "Unable to fetch symbol prices right now.",
				},
			},
			{ status: 502 },
		);
	}
}
