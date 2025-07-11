import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useApiWrapper } from "../../config/useApiWrapper";
import { getLogOutConfig } from "../../auth/api/authApi";
import AdminNavigationWide from "./AdminNavigationWide";
import AdminNavigationDropDown from "./AdminNavigationDropDown";

export default function AdminNavigation() {
  const theme = useTheme();
  const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
  const { apiPost } = useApiWrapper();

  const signOutUser = async () => {
    await apiPost(getLogOutConfig());
    window.location.reload();
  };

  return isLargeWidth ? (
    <AdminNavigationWide signOutUser={signOutUser} />
  ) : (
    <AdminNavigationDropDown signOutUser={signOutUser} />
  );
}
