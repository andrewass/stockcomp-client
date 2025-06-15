import { Box, Container } from "@mui/material";
import { ReactNode } from "react";
import { AdminNavigation } from "../pages/admin/AdminNavigation";

interface Props {
  children: ReactNode;
}

export function AdminLayout({ children }: Props) {
  return (
    <Box>
      <AdminNavigation />
      <Container sx={{ backgroundColor: "yellow", mt: "100px" }} maxWidth="xl">
        {children}
      </Container>
    </Box>
  );
}
