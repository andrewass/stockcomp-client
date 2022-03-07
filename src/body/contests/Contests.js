import {getContests} from "../../service/contestService";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";
import ContestTable from "./ContestTable";

const fetchAllContests = async () => {
    const response = await getContests([]);
    return response.data.data.contests;
}

const Contests = () => {

    const {isLoading, error, data : contests} = useQuery("getAllContests", fetchAllContests);

    if (error) return `Error! ${error}`;

    if (isLoading) return  <CircularProgress/>

    return (
        <>
            <ContestTable contests={contests}/>
        </>
    );
};

export default Contests;