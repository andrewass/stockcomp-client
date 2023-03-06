import {Avatar, Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {useQuery} from "react-query";
import {useApiWrapper} from "../config/apiWrapper";
import {GET_USER_DETAILS, getUserDetailsConfig} from "./api/userApi";
import {deepPurple} from "@mui/material/colors";
import {UserData} from "./userDetailTypes";
import ErrorComponent from "../error/ErrorComponent";
import {useParams} from "react-router-dom";
import ReactCountryFlag from "react-country-flag";


const UserDetails = () => {
    const {apiGet} = useApiWrapper();
    const params = useParams();

    const {isLoading, isFetching, error, data: userData} = useQuery<UserData>(
        [GET_USER_DETAILS, params.username],
        () => apiGet(getUserDetailsConfig(params.username)));

    if (isLoading || isFetching) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    return (
        <Box sx={{width: "400px", m: "0 auto", mt: "80px"}}>
            <Card>
                <CardContent>
                    <Avatar sx={{
                        width: 56, height: 56, bgcolor: deepPurple[500]
                    }}>OP</Avatar>
                    <Typography sx={{mt:"20px"}}>
                        Username: {userData!.username}
                    </Typography>
                    <Typography sx={{mt:"20px"}}>
                        Full name : {userData!.fullName ? userData!.fullName : "N/A"}
                    </Typography>
                    <Box display="flex" flexDirection="row" sx={{mt: "20px"}} alignItems="center">
                        <Typography sx={{mr: "5px"}}>
                            Country :
                        </Typography>
                        <ReactCountryFlag  style={{
                            width: "2em",
                            height: "2em",
                        }} countryCode="US" svg/>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default UserDetails;