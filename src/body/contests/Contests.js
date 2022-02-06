import {getAllContests} from "../../service/contestService";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";
import ContestTable from "./ContestTable";

const fetchAllContests = async () => {
    const response = await getAllContests();
    return response.data;
}

const Contests = () => {

    const {isLoading, error, data} = useQuery("allContests", fetchAllContests);

    if (error) return `Error! ${error}`;

    if (isLoading) return  <CircularProgress/>

    return (
        <>
            <ContestTable contests={data}/>
        </>
    );
};

export default Contests;