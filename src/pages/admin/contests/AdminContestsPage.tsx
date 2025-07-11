import { Container, Stack } from "@mui/material";
import AdminCreateContestModal from "./AdminCreateContestModal";
import AdminContestsTable from "./AdminContestsTable";

export default function AdminContestsPage() {
  return (
    <Container sx={{ paddingTop: "100px" }}>
      <Stack>
        <AdminContestsTable />
        <AdminCreateContestModal />
      </Stack>
    </Container>
  );
}
