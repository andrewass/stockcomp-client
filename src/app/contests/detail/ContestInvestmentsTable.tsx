import Link from "next/link";
import type { ContestParticipantInvestment } from "@/domain/contests/contestParticipantTypes.ts";
import {
	formatCurrency,
	formatNumber,
	formatSignedCurrency,
	getProfitClassName,
} from "@/lib/formatters.ts";

interface Props {
	investments: ContestParticipantInvestment[];
}

function getInvestmentProfitPercentage(
	investment: ContestParticipantInvestment,
): number {
	const totalCost = investment.averageUnitCost * investment.amount;
	return totalCost === 0 ? 0 : (investment.totalProfit / totalCost) * 100;
}

export default function ContestInvestmentsTable({ investments }: Props) {
	return (
		<section className="space-y-3">
			<div className="space-y-1">
				<h3 className="text-lg font-semibold text-base-content">
					My investments
				</h3>
				<p className="text-sm text-base-content/70">
					Current holdings in this contest.
				</p>
			</div>
			{investments.length === 0 ? (
				<div className="rounded-box border border-dashed border-base-300 bg-base-200/40 px-4 py-5 text-sm text-base-content/60">
					No investments in this contest yet.
				</div>
			) : (
				<div className="overflow-x-auto rounded-box border border-base-300">
					<table className="table table-zebra">
						<thead>
							<tr>
								<th>Symbol</th>
								<th className="text-right">Shares</th>
								<th className="text-right">Avg. cost</th>
								<th className="text-right">Value</th>
								<th className="text-right">P/L</th>
								<th className="text-right">Return</th>
							</tr>
						</thead>
						<tbody>
							{investments.map((investment) => {
								const profitClassName = getProfitClassName(
									investment.totalProfit,
								);

								return (
									<tr key={investment.symbol}>
										<td>
											<Link
												href={`/symbols/${investment.symbol}`}
												className="font-medium hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
											>
												{investment.symbol}
											</Link>
										</td>
										<td className="text-right tabular-nums">
											{formatNumber(investment.amount, {
												maximumFractionDigits: 0,
											})}
										</td>
										<td className="text-right tabular-nums">
											{formatCurrency(investment.averageUnitCost)}
										</td>
										<td className="text-right tabular-nums">
											{formatCurrency(investment.totalValue)}
										</td>
										<td
											className={`text-right font-medium tabular-nums ${profitClassName}`}
										>
											{formatSignedCurrency(investment.totalProfit)}
										</td>
										<td
											className={`text-right font-medium tabular-nums ${profitClassName}`}
										>
											{formatNumber(getInvestmentProfitPercentage(investment), {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}
											%
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</section>
	);
}
