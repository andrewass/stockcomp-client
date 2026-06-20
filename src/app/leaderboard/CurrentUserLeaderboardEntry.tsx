import LeaderboardEntryRow from "@/leaderboard/LeaderboardEntryRow.tsx";
import type { LeaderboardEntry } from "@/leaderboard/leaderboardTypes.ts";

interface Props {
	entry: LeaderboardEntry | null;
	returnTo: string;
}

export default function CurrentUserLeaderboardEntry({
	entry,
	returnTo,
}: Props) {
	return (
		<section className="max-w-full space-y-3">
			<div>
				<h2 className="text-lg font-semibold text-base-content">
					Your leaderboard entry
				</h2>
			</div>
			<div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
				<table className="table w-full min-w-[48rem]">
					<tbody>
						{entry ? (
							<LeaderboardEntryRow
								entry={entry}
								returnTo={returnTo}
								className="bg-base-200/60"
							/>
						) : (
							<tr>
								<td className="text-base-content/60" colSpan={6}>
									No leaderboard entry found for your user yet.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
}
