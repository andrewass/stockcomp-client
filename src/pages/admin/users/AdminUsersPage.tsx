import { Container, Stack } from "@mui/material";
import AdminUsersTable from "./AdminUsersTable";

export default function AdminUsersPage() {
  return (
    <Container sx={{ paddingTop: "100px" }}>
      <Stack gap={2}>
        <AdminUsersTable />
      </Stack>
    </Container>
  );
}
