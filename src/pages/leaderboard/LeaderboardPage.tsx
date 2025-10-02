import { Container } from "@mui/material";
import LeaderboardTable from "./LeaderboardTable";

export default function LeaderboardPage() {
	return (
		<Container sx={{ paddingTop: "100px" }}>
			<LeaderboardTable />
		</Container>
	);
}
