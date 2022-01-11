import React from "react";
import {getAllContests} from "../../service/contestService";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";
import ContestTable from "./ContestTable";

const fetchAllContests = async () => {
    const response = await getAllContests();
    return response.data;
}

const Contests = () => {

    const {data: contests, status} = useQuery("allContests", fetchAllContests);

    if (status === "error") return <h5>Error fetching contests</h5>

    if (status === "loading") return  <CircularProgress/>

    return (
        <React.Fragment>
            <ContestTable contests={contests}/>
        </React.Fragment>
    );
};

export default Contests;