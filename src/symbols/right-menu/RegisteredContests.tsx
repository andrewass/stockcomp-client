import {useApiWrapper} from "../../config/useApiWrapper";
import {useQuery} from "@tanstack/react-query";
import {Contest} from "../../contests/contestTypes";
import {GET_ALL_REGISTERED_CONTESTS, getRegisteredContests} from "../../contests/api/contestApi";
import ErrorComponent from "../../error/ErrorComponent";
import {CircularProgress} from "@mui/material";


const RegisteredContests = () => {
    const {apiGet} = useApiWrapper();

    const {isLoading, error, data: registered} = useQuery<Contest[]>(
        [GET_ALL_REGISTERED_CONTESTS],
        () => apiGet(getRegisteredContests())
    );

    if (error) return <ErrorComponent errorMessage={error as string}/>

    if (isLoading) return <CircularProgress/>

    return (
        <h1>Registered Contests</h1>
    );
}

export default RegisteredContests;