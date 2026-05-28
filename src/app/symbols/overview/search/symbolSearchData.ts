import "server-only";
import type { SymbolSearchResultViewModel } from "@/symbols/domain.ts";

const DEFAULT_RESULT_LIMIT = 5;

const SYMBOL_SEARCH_DATA = [
	{ symbol: "AAPL", companyName: "Apple Inc." },
	{ symbol: "MSFT", companyName: "Microsoft Corporation" },
	{ symbol: "AMZN", companyName: "Amazon.com Inc." },
	{ symbol: "NVDA", companyName: "NVIDIA Corporation" },
	{ symbol: "GOOGL", companyName: "Alphabet Inc. Class A" },
	{ symbol: "GOOG", companyName: "Alphabet Inc. Class C" },
	{ symbol: "META", companyName: "Meta Platforms Inc." },
	{ symbol: "TSLA", companyName: "Tesla Inc." },
	{ symbol: "BRK.B", companyName: "Berkshire Hathaway Inc. Class B" },
	{ symbol: "LLY", companyName: "Eli Lilly and Company" },
	{ symbol: "AVGO", companyName: "Broadcom Inc." },
	{ symbol: "JPM", companyName: "JPMorgan Chase & Co." },
	{ symbol: "V", companyName: "Visa Inc." },
	{ symbol: "XOM", companyName: "Exxon Mobil Corporation" },
	{ symbol: "UNH", companyName: "UnitedHealth Group Incorporated" },
	{ symbol: "MA", companyName: "Mastercard Incorporated" },
	{ symbol: "COST", companyName: "Costco Wholesale Corporation" },
	{ symbol: "JNJ", companyName: "Johnson & Johnson" },
	{ symbol: "HD", companyName: "The Home Depot Inc." },
	{ symbol: "PG", companyName: "Procter & Gamble Company" },
	{ symbol: "WMT", companyName: "Walmart Inc." },
	{ symbol: "NFLX", companyName: "Netflix Inc." },
	{ symbol: "ABBV", companyName: "AbbVie Inc." },
	{ symbol: "BAC", companyName: "Bank of America Corporation" },
	{ symbol: "CRM", companyName: "Salesforce Inc." },
	{ symbol: "ORCL", companyName: "Oracle Corporation" },
	{ symbol: "CVX", companyName: "Chevron Corporation" },
	{ symbol: "KO", companyName: "The Coca-Cola Company" },
	{ symbol: "MRK", companyName: "Merck & Co. Inc." },
	{ symbol: "PEP", companyName: "PepsiCo Inc." },
	{ symbol: "AMD", companyName: "Advanced Micro Devices Inc." },
	{ symbol: "ADBE", companyName: "Adobe Inc." },
	{ symbol: "TMO", companyName: "Thermo Fisher Scientific Inc." },
	{ symbol: "LIN", companyName: "Linde plc" },
	{ symbol: "CSCO", companyName: "Cisco Systems Inc." },
	{ symbol: "ACN", companyName: "Accenture plc" },
	{ symbol: "MCD", companyName: "McDonald's Corporation" },
	{ symbol: "ABT", companyName: "Abbott Laboratories" },
	{ symbol: "WFC", companyName: "Wells Fargo & Company" },
	{ symbol: "QCOM", companyName: "Qualcomm Incorporated" },
	{ symbol: "INTU", companyName: "Intuit Inc." },
	{ symbol: "IBM", companyName: "International Business Machines Corporation" },
	{ symbol: "GE", companyName: "GE Aerospace" },
	{ symbol: "AMAT", companyName: "Applied Materials Inc." },
	{ symbol: "TXN", companyName: "Texas Instruments Incorporated" },
	{ symbol: "CAT", companyName: "Caterpillar Inc." },
	{ symbol: "DHR", companyName: "Danaher Corporation" },
	{ symbol: "NOW", companyName: "ServiceNow Inc." },
	{ symbol: "VZ", companyName: "Verizon Communications Inc." },
	{ symbol: "DIS", companyName: "The Walt Disney Company" },
	{ symbol: "PM", companyName: "Philip Morris International Inc." },
	{ symbol: "UBER", companyName: "Uber Technologies Inc." },
	{ symbol: "AMGN", companyName: "Amgen Inc." },
	{ symbol: "PFE", companyName: "Pfizer Inc." },
	{ symbol: "ISRG", companyName: "Intuitive Surgical Inc." },
	{ symbol: "CMCSA", companyName: "Comcast Corporation" },
	{ symbol: "SPGI", companyName: "S&P Global Inc." },
	{ symbol: "GS", companyName: "Goldman Sachs Group Inc." },
	{ symbol: "RTX", companyName: "RTX Corporation" },
	{ symbol: "NEE", companyName: "NextEra Energy Inc." },
	{ symbol: "LOW", companyName: "Lowe's Companies Inc." },
	{ symbol: "PGR", companyName: "Progressive Corporation" },
	{ symbol: "HON", companyName: "Honeywell International Inc." },
	{ symbol: "BKNG", companyName: "Booking Holdings Inc." },
	{ symbol: "T", companyName: "AT&T Inc." },
	{ symbol: "MS", companyName: "Morgan Stanley" },
	{ symbol: "TJX", companyName: "The TJX Companies Inc." },
	{ symbol: "UNP", companyName: "Union Pacific Corporation" },
	{ symbol: "ELV", companyName: "Elevance Health Inc." },
	{ symbol: "BLK", companyName: "BlackRock Inc." },
	{ symbol: "SYK", companyName: "Stryker Corporation" },
	{ symbol: "SCHW", companyName: "Charles Schwab Corporation" },
	{ symbol: "LMT", companyName: "Lockheed Martin Corporation" },
	{ symbol: "C", companyName: "Citigroup Inc." },
	{ symbol: "VRTX", companyName: "Vertex Pharmaceuticals Incorporated" },
	{ symbol: "BA", companyName: "The Boeing Company" },
	{ symbol: "PANW", companyName: "Palo Alto Networks Inc." },
	{ symbol: "DE", companyName: "Deere & Company" },
	{ symbol: "ADP", companyName: "Automatic Data Processing Inc." },
	{ symbol: "MDT", companyName: "Medtronic plc" },
	{ symbol: "GILD", companyName: "Gilead Sciences Inc." },
	{ symbol: "SBUX", companyName: "Starbucks Corporation" },
	{ symbol: "ADI", companyName: "Analog Devices Inc." },
	{ symbol: "MU", companyName: "Micron Technology Inc." },
	{ symbol: "CB", companyName: "Chubb Limited" },
	{ symbol: "MMC", companyName: "Marsh & McLennan Companies Inc." },
	{ symbol: "PLD", companyName: "Prologis Inc." },
	{ symbol: "LRCX", companyName: "Lam Research Corporation" },
	{ symbol: "MDLZ", companyName: "Mondelez International Inc." },
	{ symbol: "SO", companyName: "The Southern Company" },
	{ symbol: "KLAC", companyName: "KLA Corporation" },
	{ symbol: "REGN", companyName: "Regeneron Pharmaceuticals Inc." },
	{ symbol: "NKE", companyName: "NIKE Inc." },
	{ symbol: "UPS", companyName: "United Parcel Service Inc." },
	{ symbol: "INTC", companyName: "Intel Corporation" },
	{ symbol: "COP", companyName: "ConocoPhillips" },
	{ symbol: "MO", companyName: "Altria Group Inc." },
	{ symbol: "ICE", companyName: "Intercontinental Exchange Inc." },
	{ symbol: "AMT", companyName: "American Tower Corporation" },
	{ symbol: "EQIX", companyName: "Equinix Inc." },
	{ symbol: "PYPL", companyName: "PayPal Holdings Inc." },
] satisfies SymbolSearchResultViewModel[];

function normalizeSearchText(value: string): string {
	return value.trim().toLowerCase();
}

function getMatchRank(
	symbol: string,
	companyName: string,
	normalizedQuery: string,
): number | null {
	const normalizedSymbol = symbol.toLowerCase();
	const normalizedCompanyName = companyName.toLowerCase();

	if (normalizedSymbol === normalizedQuery) {
		return 0;
	}

	if (normalizedSymbol.startsWith(normalizedQuery)) {
		return 1;
	}

	if (normalizedCompanyName.startsWith(normalizedQuery)) {
		return 2;
	}

	if (
		normalizedSymbol.includes(normalizedQuery) ||
		normalizedCompanyName.includes(normalizedQuery)
	) {
		return 3;
	}

	return null;
}

export function searchSymbols(
	query: string,
	limit = DEFAULT_RESULT_LIMIT,
): SymbolSearchResultViewModel[] {
	const normalizedQuery = normalizeSearchText(query);
	if (!normalizedQuery) {
		return [];
	}

	return SYMBOL_SEARCH_DATA.map((symbol) => ({
		...symbol,
		rank: getMatchRank(symbol.symbol, symbol.companyName, normalizedQuery),
	}))
		.filter(
			(symbol): symbol is SymbolSearchResultViewModel & { rank: number } =>
				symbol.rank !== null,
		)
		.sort((first, second) => {
			if (first.rank !== second.rank) {
				return first.rank - second.rank;
			}

			return first.symbol.localeCompare(second.symbol);
		})
		.slice(0, limit)
		.map((symbol) => ({
			symbol: symbol.symbol,
			companyName: symbol.companyName,
		}));
}
