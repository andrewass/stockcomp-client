import {getContests} from "../api/contestClient";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";
import ContestTable from "../components/contest/ContestTable";

const fetchAllContests = async () => {
    return await getContests([]);
}

const Contests = () => {

    const {isLoading, error, data: contests} = useQuery("getAllContests", fetchAllContests);

    if (error) return `Error! ${error}`;

    if (isLoading) return <CircularProgress/>

    return (
        <ContestTable contests={contests}/>
    );
};

export default Contests;