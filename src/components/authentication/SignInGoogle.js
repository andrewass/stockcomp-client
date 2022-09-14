import Button from "@mui/material/Button";
import React from "react";
import googleLogo from "../../icons/google-logo.svg"
import {Avatar} from "@mui/material";

export const SignInGoogle = () => {

    return (
        <div>
            <Button component="a" sx={{mb: 2}}
                    startIcon={<Avatar alt="Google icon" src={googleLogo}/>}>
                Sign in with Google
            </Button>
        </div>
    );
}