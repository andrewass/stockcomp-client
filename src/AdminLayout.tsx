import { Box, Container } from "@mui/material";
import { ReactNode } from "react";
import { useThemeContext } from "./theme/AppThemeContext";
import { AdminNavigation } from "./pages/admin/AdminNavigation";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const { appTheme } = useThemeContext();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: appTheme.palette.background.default,
      }}
    >
      <AdminNavigation />
      <Box
        sx={{
          width: "100%",
          height: "120px",
          backgroundColor: appTheme.palette.secondary.main,
        }}
      />
      <Container sx={{ mt: "100px" }} maxWidth="xl">
        {children}
      </Container>
    </Box>
  );
}
