import {useQuery} from "react-query";
import {getContests} from "../api/contestClient";
import {Box, CircularProgress} from "@mui/material";
import AdminContestTable from "../components/admin/AdminContestTable";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {Contest} from "../types/contest";


const AdminContests = () => {

    const navigate = useNavigate();

    const fetchContests = () => {
        return getContests([]);
    }

    const {isLoading, error, data: contests} =
        useQuery("getAllContests", fetchContests);

    if (isLoading) return <CircularProgress/>

    if (error) return `Error! ${error}`;

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