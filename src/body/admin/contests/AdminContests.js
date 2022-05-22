import {useQuery} from "react-query";
import {getContests} from "../../contests/client/contestClient";
import {CircularProgress} from "@mui/material";
import AdminContestTable from "./AdminContestTable";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

export const AdminContests = () => {

    const navigate = useNavigate();

    const fetchContests = () => {
        return getContests([]);
    }

    const {isLoading, error, data: contests} =
        useQuery("getAllContests", fetchContests);

    if (isLoading) return <CircularProgress/>

    if (error) return `Error! ${error}`;

    return (
        <div>
            <AdminContestTable contests={contests}/>

            <Button variant="outlined" sx={{mt: "1rem", maxWidth: "10rem"}}
                    onClick={() => navigate("/admin/contests/create")}>
                Create Contest
            </Button>
        </div>
    );
}