import Link from "next/link";
import CountryFlag from "@/components/country/CountryFlag.tsx";
import PageableTable from "@/components/table/PageableTable.tsx";
import UrlTablePager from "@/components/table/UrlTablePager.tsx";
import type { ContestLeaderboardParticipant } from "@/domain/contests/contestParticipantTypes.ts";
import { formatNumber } from "@/lib/formatters.ts";
import { buildUserDetailHref } from "@/users/userProfileNavigation.ts";

interface Props {
	participants: ContestLeaderboardParticipant[];
	contestId: number;
	pageSize: number;
	currentPage: number;
	totalEntriesCount: number;
}

type ContestLeaderboardRow = ContestLeaderboardParticipant & {
	id: number;
};

const contestLeaderboardHeaderItems = [
	"Ranking",
	"Country",
	"Name",
	"Total Value",
	"Remaining Funds",
];

export default function ContestLeaderboardTable({
	participants,
	contestId,
	pageSize,
	currentPage,
	totalEntriesCount,
}: Props) {
	const returnTo = `/contest/${contestId}/${currentPage}?view=leaderboard&pageSize=${pageSize}`;

	return (
		<PageableTable<ContestLeaderboardRow>
			items={participants.map((participant) => ({
				...participant,
				id: participant.participantId,
			}))}
			headerItems={contestLeaderboardHeaderItems}
			pagination={
				<UrlTablePager
					currentPage={currentPage}
					pageSize={pageSize}
					totalEntriesCount={totalEntriesCount}
					basePath={`/contest/${contestId}?view=leaderboard`}
				/>
			}
			renderRow={(participant) => (
				<tr key={participant.id}>
					<td>{participant.rank ?? "-"}</td>
					<td>
						<CountryFlag country={participant.country} />
					</td>
					<td>
						<Link
							href={buildUserDetailHref(participant.username, returnTo)}
							className="link link-hover font-medium"
						>
							{participant.username}
						</Link>
					</td>
					<td>
						{formatNumber(participant.totalValue, { maximumFractionDigits: 2 })}
					</td>
					<td>
						{formatNumber(participant.remainingFunds, {
							maximumFractionDigits: 2,
						})}
					</td>
				</tr>
			)}
		/>
	);
}
