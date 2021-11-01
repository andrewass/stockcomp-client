import React, {useEffect, useState} from "react";
import {Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {getData} from "country-list";
import toast, {Toaster} from "react-hot-toast";
import Button from "@mui/material/Button";
import {getUserDetails, updateUserDetails} from "../../service/userService";

const countries = getData();

const UserAccountWrite = () => {

    const [userDetails, setUserDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [country, setCountry] = useState();
    const [fullName, setFullName] = useState();


    const getUserData = async () => {
        const response = await getUserDetails();
        setUserDetails({
            username: response.data.username,
            fullName: response.data.fullName,
            country: response.data.country
        });
        setCountry(response.data.country);
        setFullName(response.data.fullName);
        setIsLoading(false);
    }

    useEffect(() => {
        getUserData().catch(error => console.log(error));
    }, []);


    const submitUpdatedUserDetails = async () => {
        await updateUserDetails(userDetails.username, fullName, country)
            .catch(error => console.log(error));
        toast.success("User details successfully updated", {
            duration: 4000,
            position: "top-center"
        });
    }

    if (isLoading) {
        return <CircularProgress/>
    }
    return (
        <Box sx={{ml: "30%", mt: "10%"}}>
            <Typography variant="h5">{userDetails.username}</Typography>
            <Box sx={{display: "flex", flexDirection: "column", width: "25%", mt: "3rem"}}>
                <TextField label={userDetails.fullName ? userDetails.fullName : "Full Name"}
                           onChange={event => setFullName(event.target.value)}/>
                <FormControl sx={{mt: "3rem"}}>
                    <InputLabel>Country</InputLabel>
                    <Select value={country ? country : countries[0].name}
                            label="Country" onChange={event => setCountry(event.target.value)}
                            sx={{minWidth: "15rem"}}>
                        {countries.map((country) => (
                            <MenuItem value={country.code}>
                                {country.name ? country.name : "Select value"}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="outlined" sx={{mt: "1rem", maxWidth: "10rem"}}
                        onClick={() => submitUpdatedUserDetails()}>
                    Update
                </Button>
                <Toaster/>
            </Box>
        </Box>

    );
}

export default UserAccountWrite;