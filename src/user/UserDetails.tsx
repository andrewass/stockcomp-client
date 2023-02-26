import {Avatar, Box, Card, CardActions, CardContent, CircularProgress, Typography} from "@mui/material";
import {useQuery} from "react-query";
import {useApiWrapper} from "../config/apiWrapper";
import {GET_USER_DETAILS, getUserDetailsConfig} from "./api/userApi";
import {deepPurple} from "@mui/material/colors";
import {UserDetailsForm} from "./UserDetailsForm";
import {UserData} from "./userDetailTypes";
import ErrorComponent from "../error/ErrorComponent";
import {useParams} from "react-router-dom";


const UserDetails = () => {
    const {apiGet} = useApiWrapper();
    const params = useParams();

    const {isLoading, isFetching, error, data: userData} = useQuery<UserData>(GET_USER_DETAILS,
        () => apiGet(params.username ? getUserDetailsConfig(params.username) : getUserDetailsConfig()));

    if (isLoading || isFetching) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    return (
        <Box sx={{width: "400px", m: "0 auto", mt: "80px"}}>
            <Card>
                <CardContent>
                    <Avatar sx={{
                        width: 56, height: 56, bgcolor: deepPurple[500]
                    }}>OP</Avatar>
                    <Typography>
                        Username: {userData!.username}
                    </Typography>
                    <Typography>
                        {userData!.username}
                    </Typography>
                </CardContent>
                <CardActions>
                    <UserDetailsForm userData={userData!}/>
                </CardActions>
            </Card>
        </Box>
    );
}

export default UserDetails;