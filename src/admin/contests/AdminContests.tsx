import {Box, useMediaQuery, useTheme} from "@mui/material";
import {AdminContestTable} from "./AdminContestTable";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";


const AdminContests = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Box sx={{width: isLargeWidth ? "60%" : "95%", m: "0 auto", mt: "10%"}}
            display="flex" flexDirection="column">
            <AdminContestTable/>
            <Button sx={{mt:"1rem", maxWidth:"10rem"}} onClick={() => navigate("/admin/contests/create")}>
                Create Contest
            </Button>
        </Box>
    );
}

export default AdminContests;