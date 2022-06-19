import {getContests} from "../api/contestClient";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";
import ContestTable from "../components/contest/ContestTable";
import ErrorComponent from "../components/common/ErrorComponent";
import {Contest} from "../types/contest";

const fetchAllContests = async () : Promise<Contest[]> => {
    return await getContests([])
}

const Contests = () => {

    const {isLoading, error, data: contests} = useQuery("getAllContests", fetchAllContests)

    if (error) return <ErrorComponent errorMessage={error as string}/>

    if (isLoading) return <CircularProgress/>

    return (
        <ContestTable contests={contests!}/>
    )
}

export default Contests