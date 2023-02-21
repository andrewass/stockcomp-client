import {useState} from "react";
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
import {getData} from "country-list";
import toast from "react-hot-toast";
import {getUserDetails, updateUserDetails} from "../api/userClient";
import {useMutation, useQuery} from "react-query";
import {queryClient} from "../config/queryConfig";
import {useApiWrapper} from "../config/apiWrapper";
import {getUserDetailsConfig} from "./api/userApi";
import background from "../images/background.jpg"
import {deepPurple} from "@mui/material/colors";
import {UserDetailsForm} from "./UserDetailsForm";

const countries = getData();

const UserDetails = () => {

    const [userDetails, setUserDetails] = useState();
    const [country, setCountry] = useState();
    const [fullName, setFullName] = useState();
    const {apiGet} = useApiWrapper()


    const fetchUserDetails = async () => {
        const response = await apiGet(getUserDetailsConfig());
        if (!userDetails) {
            setUserDetails({
                username: response.username,
                fullName: response.fullName,
                country: response.country
            });
            setCountry(response.country);
            setFullName(response.fullName);
        }
        return response
    }

    const mutation = useMutation((credentials) => updateUserDetails(credentials), {
        onSuccess: () => queryClient.invalidateQueries("getUserDetails"),
        onError: () => {
            toast.error("Unable to update user details", {
                duration: 4000,
                position: "top-center"
            });
        }
    })

    const submitUserDetails = () => {
        let username = userDetails.username;
        mutation.mutate({username, fullName, country});
    }

    const {isLoading, isFetching, error} = useQuery("getUserDetails", fetchUserDetails);

    if (isLoading || isFetching) return <CircularProgress/>

    if (error) return `Error! ${error}`;

    return (
        <Box sx={{width: "400px", m: "0 auto", mt: "80px"}}>
            <Card>
                <CardMedia
                    sx={{height: "140px"}}
                    image={background}
                    title="user profile background"
                />
                <CardContent>
                    <Avatar sx={{
                        width: 56, height: 56, bgcolor: deepPurple[500]
                    }}>OP</Avatar>
                    <Typography>
                        Username: {userDetails.username}
                    </Typography>
                    <Typography>
                        {userDetails.username}
                    </Typography>
                </CardContent>
                <CardActions>
                    <UserDetailsForm/>
                </CardActions>
            </Card>
        </Box>
    );
}

export default UserDetails;