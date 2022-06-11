import {useState} from "react";
import {Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {getData} from "country-list";
import toast, {Toaster} from "react-hot-toast";
import Button from "@mui/material/Button";
import {getUserDetails, updateUserDetails} from "../api/userClient";
import {useMutation, useQuery} from "react-query";
import {queryClient} from "../config/queryConfig";

const countries = getData();

const UserAccount = () => {

    const [userDetails, setUserDetails] = useState();
    const [country, setCountry] = useState();
    const [fullName, setFullName] = useState();

    const fetchUserDetails = async () => {
        const response = await getUserDetails();
        if (!userDetails) {
            setUserDetails({
                username: response.data.username,
                fullName: response.data.fullName,
                country: response.data.country
            });
            setCountry(response.data.country);
            setFullName(response.data.fullName);
        }
        return response.data;
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
        <Box sx={{ml: "30%", mt: "10%"}}>
            <Typography variant="h5">{userDetails.username}</Typography>
            <Box sx={{display: "flex", flexDirection: "column", width: "25%", mt: "3rem"}}>

                <TextField label={userDetails.fullName ? userDetails.fullName : "Full Name"}
                           onChange={event => setFullName(event.target.value)}/>

                <FormControl sx={{mt: "3rem"}}>
                    <InputLabel>Country</InputLabel>
                    <Select value={country ? country : ""} sx={{minWidth: "15rem"}}
                            label="Country" onChange={event => setCountry(event.target.value)}>
                        {countries.map((country) => (
                            <MenuItem key={country.code} value={country.code}>
                                {country.name ? country.name : "Select value"}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="outlined" sx={{mt: "1rem", maxWidth: "10rem"}}
                        onClick={submitUserDetails}>
                    Update
                </Button>

                <Toaster/>
            </Box>
        </Box>
    );
}

export default UserAccount;