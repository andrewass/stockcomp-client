import { Box, Container, Stack } from "@mui/material";
import AdminContestsTable from "./AdminContestsTable";
import AdminCreateContestModal from "./AdminCreateContestModal";

export default function AdminContestsPage() {
	return (
		<Container sx={{ paddingTop: "100px" }}>
			<Stack gap={2}>
				<AdminContestsTable />
				<Box display="flex" justifyContent="end">
					<AdminCreateContestModal />
				</Box>
			</Stack>
		</Container>
	);
}
