import { Container } from "@mui/material";
import LeaderboardTable from "@/leaderboard/LeaderboardTable.tsx";

export default async function LeaderboardPage() {
	return (
		<Container>
			<LeaderboardTable />
		</Container>
	);
}
