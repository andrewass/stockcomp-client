import { Box, Container, Stack } from "@mui/material";
import AdminCreateContestModal from "./AdminCreateContestModal";
import AdminContestsTable from "./AdminContestsTable";

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
