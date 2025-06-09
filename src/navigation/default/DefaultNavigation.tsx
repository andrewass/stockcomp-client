import {useMediaQuery} from "@mui/material";
import DefaultNavigationDropDown from "./DefaultNavigationDropDown";
import {useTheme} from "@mui/material/styles";
import {useApiWrapper} from "../../config/useApiWrapper";
import {getLogOutConfig} from "../../auth/api/authApi";
import DefaultNavigationWide from "./DefaultNavigationWide";

export const DefaultNavigation = () => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
    const {apiPost} = useApiWrapper();

    const signOutUser = async () => {
        await apiPost(getLogOutConfig());
        window.location.reload();
    };

    return isLargeWidth ?
        <DefaultNavigationWide signOutUser={signOutUser}/> :
        <DefaultNavigationDropDown signOutUser={signOutUser}/>;
};
