import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getLogOutConfig } from "../../auth/api/authApi";
import { apiPost } from "../../config/apiWrapper";
import AdminNavigationDropDown from "./AdminNavigationDropDown";
import AdminNavigationWide from "./AdminNavigationWide";

export default function AdminNavigation() {
	const theme = useTheme();
	const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));

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
