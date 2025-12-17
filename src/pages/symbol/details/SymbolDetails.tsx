import { Stack } from "@mui/material";
import type {
	StockFinancials,
	StockPrice,
} from "../../../domain/symbols/symbolTypes";
import PriceChart from "./PriceChart";
import SymbolStatistics from "./SymbolStatistics";

interface Props {
	stockPrice: StockPrice;
	symbol: string;
	stockFinancials: StockFinancials;
}

export default function SymbolDetails({
	symbol,
	stockPrice,
	stockFinancials,
}: Props) {
	return (
		<Stack>
			<PriceChart symbol={symbol} />
			<SymbolStatistics
				stockFinancials={stockFinancials}
				stockPrice={stockPrice}
			/>
		</Stack>
	);
}
