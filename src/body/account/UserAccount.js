import React, {useEffect, useState} from "react";
import {getUserDetails} from "../../service/userService";
import {Box, CircularProgress, Typography} from "@mui/material";
import UserAccountRead from "./UserAccountRead";
import UserAccountWrite from "./UserAccountWrite";

const UserAccount = ({username}) => {

    const [userDetails, setUserDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getUserData = async () => {
        const response = await getUserDetails(username);
        setUserDetails({
            username: response.data.username,
            fullName: response.data.fullName,
            country: response.data.country
        });
        setIsLoading(false);
    }

    useEffect(() => {
        getUserData().catch(error => console.log(error));
    }, []);


    if (isLoading) {
        return <CircularProgress/>
    }
    return (
        <Box sx={{ml:"30%", mt:"10%"}}>
            <Typography variant="h5">{userDetails.username}</Typography>
            {username ? <UserAccountRead userDetails={userDetails}/>
                : <UserAccountWrite userDetails={userDetails}/>}
        </Box>
    );
}

export default UserAccount;