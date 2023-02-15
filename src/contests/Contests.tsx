import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";
import {GET_ALL_CONTESTS, getContestsConfig} from "./api/contestApi";
import {useApiWrapper} from "../config/apiWrapper";
import { ContestTable } from "./ContestTable";
import ErrorComponent from "../error/ErrorComponent";


const Contests = () => {

    const {apiPost} = useApiWrapper();

    const {isLoading, error, data: contests} =
        useQuery(GET_ALL_CONTESTS, () => apiPost(getContestsConfig([])));

    if (error) return <ErrorComponent errorMessage={error as string}/>

    if (isLoading) return <CircularProgress/>

    return (
        <ContestTable contests={contests!}/>
    )
}

export default Contests