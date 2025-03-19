import {Box, useMediaQuery, useTheme} from "@mui/material";
import {AdminContestTable} from "./AdminContestTable";
import {useNavigate} from "react-router";
import AdminCreateContestModal from "./AdminCreateContestModal";


const AdminContestsPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Box sx={{width: isLargeWidth ? "60%" : "95%", m: "0 auto", mt: "10%"}}
             display="flex" flexDirection="column">
            <AdminContestTable/>
            <AdminCreateContestModal/>
        </Box>
    );
}

export default AdminContestsPage;
