import Button from "@mui/material/Button";
import React from "react";
import {GOOGLE_AUTH_URL} from "../../service/serviceConfig";
import {Avatar} from "@mui/material";

export const SignInGoogle = () => {

    return (
        <div>
            <Button component="a" href={GOOGLE_AUTH_URL}
                    startIcon={<Avatar alt="Google icon" src="/../../icons/google-logo.svg"/>}>
                Sign in with Google
            </Button>
        </div>
    );
}