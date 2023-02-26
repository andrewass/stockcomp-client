import {useQuery} from "react-query";
import {Box, CircularProgress} from "@mui/material";
import AdminContestTable from "./AdminContestTable";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useApiWrapper} from "../config/apiWrapper";
import {getContestsAdminConfig} from "./api/adminApi";
import {Contest} from "../contests/contestTypes";
import ErrorComponent from "../error/ErrorComponent";


const AdminContests = () => {
    const navigate = useNavigate();
    const {apiGet} = useApiWrapper()

    const {isLoading, error, data: contests} = useQuery("getAllContestsAdmin",
        () => apiGet(getContestsAdminConfig([])));

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>;

    return (
        <Box display="flex" flexDirection="column">
            <AdminContestTable contests={contests as Contest[]}/>
            <Button variant="outlined" sx={{mt: "1rem", maxWidth: "10rem"}}
                    onClick={() => navigate("/admin/contests/create")}>
                Create Contest
            </Button>
        </Box>
    );
}

export default AdminContests;