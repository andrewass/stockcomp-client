import React from "react";
import {Box, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";

const UserAccountRead = () => {

    const data = useLocation();
    const user = data.state.user;

    return (
        <Box>
            <Typography>User Account Read {JSON.stringify(user)}</Typography>
        </Box>
    );

}

export default UserAccountRead;