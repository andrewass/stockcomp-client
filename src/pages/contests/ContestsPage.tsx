import { Container } from "@mui/material";
import ContestsTable from "./ContestsTable";

export default function ContestsPage() {
	return (
		<Container sx={{ paddingTop: "100px" }}>
			<ContestsTable />
		</Container>
	);
}
