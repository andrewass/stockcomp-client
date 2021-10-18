import React, {useEffect, useState} from "react";
import {getUserDetails} from "../../service/userService";
import {Box, CircularProgress, Typography} from "@mui/material";

const UserAccountRead = () => {

    const [username, setUsername] = useState();
    const [fullName, setFullName] = useState();
    const [country, setCountry] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getUserData = async () => {
        const response = await getUserDetails();
        setUsername(response.data.username);
        setFullName(response.data.fullName);
        setCountry(response.data.country);
    }

    useEffect(() => {
        getUserData().catch(error => console.log(error));
    }, []);


    if (isLoading) {
        return <CircularProgress/>
    }
    return (
        <Box>
            <Typography>Hello</Typography>
        </Box>
    );

}

export default UserAccountRead;