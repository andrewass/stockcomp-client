import {Box, useMediaQuery} from "@mui/material";
import {AdminUserTable} from "./AdminUserTable";
import {useTheme} from "@mui/material/styles";


export const AdminUsers = () => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Box sx={{width: isLargeWidth ? "60%" : "95%", m: "0 auto"}}
             display="flex" flexDirection="column">
            <AdminUserTable/>
        </Box>
    );
}