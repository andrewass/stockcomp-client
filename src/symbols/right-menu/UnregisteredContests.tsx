import {useApiWrapper} from "../../config/useApiWrapper";
import {useQuery} from "@tanstack/react-query";
import {Contest} from "../../contests/contestTypes";
import {GET_ALL_UNREGISTERED_CONTESTS, getUnregisteredContests} from "../../contests/api/contestApi";
import ErrorComponent from "../../error/ErrorComponent";
import {CircularProgress} from "@mui/material";

const UnregisteredContests = () => {
    const {apiGet} = useApiWrapper();

    const {isLoading, error, data} = useQuery<Contest>(
        [GET_ALL_UNREGISTERED_CONTESTS],
        () => apiGet(getUnregisteredContests())
    );

    if (error) return <ErrorComponent errorMessage={error as string}/>

    if (isLoading) return <CircularProgress/>

    return <p>Unregistered contests</p>
}

export default UnregisteredContests;