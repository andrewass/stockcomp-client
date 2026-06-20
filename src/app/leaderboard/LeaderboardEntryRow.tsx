import Link from "next/link";
import type { LeaderboardEntry } from "@/leaderboard/leaderboardTypes.ts";
import { formatNumber } from "@/lib/formatters.ts";
import { buildUserDetailHref } from "@/users/userProfileNavigation.ts";

interface Props {
	entry: LeaderboardEntry;
	returnTo: string;
	className?: string;
}

function getMedalClassName(medalValue: string): string {
	switch (medalValue) {
		case "Gold":
			return "badge-warning";
		case "Silver":
			return "badge-neutral";
		case "Bronze":
			return "badge-accent";
		default:
			return "badge-ghost";
	}
}

function renderMedals(entry: LeaderboardEntry) {
	if (entry.medals.length === 0) {
		return <span className="text-base-content/45">None</span>;
	}

	return (
		<div className="flex flex-wrap gap-1.5">
			{entry.medals.map((medal) => (
				<span
					key={`${entry.userId}-${medal.medalValue}-${medal.position}`}
					className={`badge badge-sm ${getMedalClassName(medal.medalValue)}`}
				>
					{medal.medalValue}
				</span>
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
			<td>{entry.country ?? "N/A"}</td>
			<td>
				<Link
					href={buildUserDetailHref(entry.username, returnTo)}
					className="link link-hover font-medium"
				>
					{entry.displayName}
				</Link>
				<div className="text-xs text-base-content/50">@{entry.username}</div>
			</td>
			<td className="font-semibold tabular-nums">
				{formatNumber(entry.score)}
			</td>
			<td className="tabular-nums">{formatNumber(entry.contestCount)}</td>
			<td>{renderMedals(entry)}</td>
		</tr>
	);
}
