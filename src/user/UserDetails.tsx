import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography
} from "@mui/material";
import {useQuery} from "react-query";
import {useApiWrapper} from "../config/apiWrapper";
import {GET_USER_DETAILS, getUserDetailsConfig} from "./api/userApi";
import {deepPurple} from "@mui/material/colors";
import {UserDetailsForm} from "./UserDetailsForm";
import {UserData} from "./userDetailTypes";
import ErrorComponent from "../error/ErrorComponent";


const UserDetails = () => {

    const {apiGet} = useApiWrapper()

    const {isLoading, isFetching, error, data: userData} = useQuery<UserData>(GET_USER_DETAILS,
        () => apiGet(getUserDetailsConfig()));

    if (isLoading || isFetching) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    return (
        <Box sx={{width: "400px", m: "0 auto", mt: "80px"}}>
            <Card>
                <CardMedia
                    sx={{height: "140px"}}
                    title="user profile background"
                />
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