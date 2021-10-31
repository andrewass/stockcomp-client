import React, {useEffect, useState} from "react";
import ContestTable from "./ContestTable";
import {CircularProgress} from "@mui/material";
import {getAllContests} from "../../service/contestService";

const Contests = () => {

    const [contests, setContests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const populateContests = async () => {
        const contestsResponse = await getAllContests();
        setContests(contestsResponse.data);
        setIsLoading(false);
    }

    useEffect(() => {
        populateContests().catch(error => console.log(error));
    }, []);

    if (isLoading) {
        return <CircularProgress/>
    }
    return (
        <>
            <ContestTable contests={contests}/>
        </>
    );
};

export default Contests;