import {useQuery} from "@tanstack/react-query";
import {Box, CircularProgress, useMediaQuery, useTheme} from "@mui/material";
import {AdminContestTable} from "./AdminContestTable";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useApiWrapper} from "../../config/useApiWrapper";
import {Contest} from "../../contests/contestTypes";
import {GET_ALL_CONTESTS_ADMIN, getContestsAdminConfig} from "../api/adminApi";
import ErrorComponent from "../../error/ErrorComponent";


const AdminContests = () => {
    const navigate = useNavigate();
    const {apiGet} = useApiWrapper()
    const theme = useTheme();

    const {isLoading, error, data: contests} = useQuery<Contest[]>(
        [GET_ALL_CONTESTS_ADMIN],
        () => apiGet(getContestsAdminConfig([]))
    );

    const isLargeWidth = useMediaQuery(theme.breakpoints.up("md"));

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    return (
        <Box sx={{width: isLargeWidth ? "60%" : "95%", m: "0 auto"}}
             display="flex" flexDirection="column">
            <AdminContestTable contests={contests as Contest[]}/>
            <Button sx={{mt: "1rem", maxWidth: "10rem"}}
                    onClick={() => navigate("/admin/contests/create")}>
                Create Contest
            </Button>
        </Box>
    );
}

export default AdminContests;