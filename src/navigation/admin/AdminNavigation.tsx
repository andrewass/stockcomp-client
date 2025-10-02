import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getLogOutConfig } from "../../auth/api/authApi";
import { useApiWrapper } from "../../config/useApiWrapper";
import AdminNavigationDropDown from "./AdminNavigationDropDown";
import AdminNavigationWide from "./AdminNavigationWide";

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
