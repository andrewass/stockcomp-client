import Link from "next/link";
import PageableTable from "@/components/table/PageableTable.tsx";
import type { ContestParticipantInvestment } from "@/domain/contests/contestParticipantTypes.ts";
import {
	formatCurrency,
	formatNumber,
	formatSignedCurrency,
	getProfitClassName,
} from "@/lib/formatters.ts";

interface Props {
	investments: ContestParticipantInvestment[];
	contestId: number;
	pageSize: number;
	currentPage: number;
}

type InvestmentTableEntry = ContestParticipantInvestment & {
	id: string;
};

const investmentHeaderItems = [
	"Symbol",
	"Shares",
	"Avg. cost",
	"Value",
	"P/L",
	"Return",
];

function getInvestmentProfitPercentage(
	investment: ContestParticipantInvestment,
): number {
	const totalCost = investment.averageUnitCost * investment.amount;
	return totalCost === 0 ? 0 : (investment.totalProfit / totalCost) * 100;
}

export default function ContestInvestmentsTable({
	investments,
	contestId,
	pageSize,
	currentPage,
}: Props) {
	const pageStart = currentPage * pageSize;
	const pageInvestments = investments
		.slice(pageStart, pageStart + pageSize)
		.map((investment) => ({
			...investment,
			id: investment.symbol,
		}));

	return (
		<PageableTable<InvestmentTableEntry>
			items={pageInvestments}
			pageSize={pageSize}
			currentPage={currentPage}
			totalEntriesCount={investments.length}
			basePath={`/contest/${contestId}?view=holdings`}
			headerItems={investmentHeaderItems}
			renderRow={(investment) => {
				const profitClassName = getProfitClassName(investment.totalProfit);

				return (
					<tr key={investment.id}>
						<td>
							<Link
								href={`/symbols/${investment.symbol}`}
								className="font-medium hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
							>
								{investment.symbol}
							</Link>
						</td>
						<td className="tabular-nums">
							{formatNumber(investment.amount, {
								maximumFractionDigits: 0,
							})}
						</td>
						<td className="tabular-nums">
							{formatCurrency(investment.averageUnitCost)}
						</td>
						<td className="tabular-nums">
							{formatCurrency(investment.totalValue)}
						</td>
						<td className={`font-medium tabular-nums ${profitClassName}`}>
							{formatSignedCurrency(investment.totalProfit)}
						</td>
						<td className={`font-medium tabular-nums ${profitClassName}`}>
							{formatNumber(getInvestmentProfitPercentage(investment), {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
							%
						</td>
					</tr>
				);
			}}
		/>
	);
}
