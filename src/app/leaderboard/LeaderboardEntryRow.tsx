import Link from "next/link";
import CountryFlag from "@/components/country/CountryFlag.tsx";
import {
	type LeaderboardEntry,
	MedalValue,
} from "@/leaderboard/leaderboardTypes.ts";
import { formatNumber } from "@/lib/formatters.ts";
import { buildUserDetailHref } from "@/users/userProfileNavigation.ts";

interface Props {
	entry: LeaderboardEntry;
	returnTo: string;
	className?: string;
}

const medalValueDisplayOrder = [
	MedalValue.Gold,
	MedalValue.Silver,
	MedalValue.Bronze,
];

function getMedalClassName(medalValue: MedalValue): string {
	switch (medalValue) {
		case MedalValue.Gold:
			return "badge-warning";
		case MedalValue.Silver:
			return "badge-neutral";
		case MedalValue.Bronze:
			return "badge-accent";
		default:
			return "badge-ghost";
	}
}

function renderMedals(entry: LeaderboardEntry) {
	if (entry.medals.length === 0) {
		return <span className="text-base-content/45">None</span>;
	}

	const medalCounts = entry.medals.reduce<Record<MedalValue, number>>(
		(counts, medal) => {
			counts[medal.medalValue] += 1;
			return counts;
		},
		{
			[MedalValue.Gold]: 0,
			[MedalValue.Silver]: 0,
			[MedalValue.Bronze]: 0,
		},
	);
	const groupedMedalValues = medalValueDisplayOrder.filter(
		(medalValue) => medalCounts[medalValue] > 0,
	);

	return (
		<div className="flex flex-wrap items-start gap-2">
			{groupedMedalValues.map((medalValue) => (
				<div
					key={`${entry.userId}-${medalValue}`}
					className="grid justify-items-center gap-1"
				>
					<span className={`badge badge-sm ${getMedalClassName(medalValue)}`}>
						{medalValue}
					</span>
					<span className="text-[0.625rem] font-semibold leading-none tabular-nums text-base-content/60">
						x{medalCounts[medalValue]}
					</span>
				</div>
			))}
		</div>
	);
}

export default function LeaderboardEntryRow({
	entry,
	returnTo,
	className,
}: Props) {
	return (
		<tr className={className}>
			<td className="font-semibold tabular-nums">#{entry.ranking}</td>
			<td>
				<CountryFlag country={entry.country} emptyLabel="N/A" />
			</td>
			<td>
				<Link
					href={buildUserDetailHref(entry.username, returnTo)}
					className="link link-hover font-medium"
				>
					{entry.username}
				</Link>
			</td>
			<td className="font-semibold tabular-nums">
				{formatNumber(entry.score)}
			</td>
			<td className="tabular-nums">{formatNumber(entry.contestCount)}</td>
			<td>{renderMedals(entry)}</td>
		</tr>
	);
}
