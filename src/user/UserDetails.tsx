import {UserGeneralDetails} from "./UserGeneralDetails";
import {Box, CircularProgress} from "@mui/material";
import {useApiWrapper} from "../config/useApiWrapper";
import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {UserExtended} from "./userTypes";
import {GET_USER_DETAILS, getUserDetailsConfig} from "./api/userApi";
import ErrorComponent from "../error/ErrorComponent";
import {UserLeaderboardDetails} from "./UserLeaderboardDetails";

export const UserDetails = () => {
    const {apiGet} = useApiWrapper();
    const params = useParams();

    const {isLoading, error, data: userData} = useQuery<UserExtended>({
        queryKey: [GET_USER_DETAILS, params.username],
        queryFn: () => apiGet(getUserDetailsConfig(params.username!))
    });

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error.message}/>

    return (
        <Box>
            <UserGeneralDetails userData={userData!}/>
            <UserLeaderboardDetails/>
        </Box>
    );
}
