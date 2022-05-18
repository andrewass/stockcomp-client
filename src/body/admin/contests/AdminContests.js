import {useQuery} from "react-query";
import {getContests} from "../../contests/client/contestClient";
import {CircularProgress} from "@mui/material";
import AdminContestTable from "./AdminContestTable";

export const AdminContests = () => {

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
        </div>
    );
}