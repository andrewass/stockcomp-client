import { Box, useMediaQuery, useTheme } from "@mui/material";
import AdminCreateContestModal from "./AdminCreateContestModal";
import { AdminContestsTable } from "./AdminContestsTable";

export default function AdminContestsPage() {
  const theme = useTheme();
  const isLargeWidth = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{ width: isLargeWidth ? "60%" : "95%", m: "0 auto", mt: "10%" }}
      display="flex"
      flexDirection="column"
    >
      <AdminContestsTable />
      <AdminCreateContestModal />
    </Box>
  );
}
