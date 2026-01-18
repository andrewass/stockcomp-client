import { Box, Container, Stack } from "@mui/material";
import AdminContestsTable from "@/admin/contests/AdminContestsTable.tsx";
import AdminCreateContestModal from "@/admin/contests/AdminCreateContestModal.tsx";

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
