import React, {useContext, useState} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import {setSignedInToLocalStorage, signIn} from "../../service/authService";
import {UserContext} from "../../context/UserContext";
import {useHistory} from "react-router-dom";
import {InputAdornment, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {makeStyles} from "@mui/styles";
import toast, {Toaster} from "react-hot-toast";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "10% auto",
        border: "1px ridge black",
        width: "30%"
    }
});

const SignIn = ({setDisplaySignUp}) => {

    const classes = useStyles();
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setIsSignedIn} = useContext(UserContext);

    const updateUsername = (event) => {
        setUsername(event.target.value);
    };

    const updatePassword = (event) => {
        setPassword(event.target.value);
    };

    const postSignInToServer = async (event) => {
        event.preventDefault();
        try {
            let response = await signIn(username, password);
            setIsSignedIn(true);
            setSignedInToLocalStorage(true);
            (response.data === 'ADMIN') ? history.push("/admin") : history.push("/stocks");
        } catch (e) {
            toast.error("Unable to sign in. Verify username and password is correct", {
                duration: 4000,
                position: "top-center"
            });
        }
    }

    return (
        <form className={classes.root} onSubmit={postSignInToServer} id="signInForm">
            <Typography variant="h4" sx={{mt: 4}}>
                STOCK COMP
            </Typography>
            <TextField sx={{mt: 4}} label="Username" onChange={e => updateUsername(e)}
                       InputProps={{
                           startAdornment: (
                               <InputAdornment position="start">
                                   <AccountCircleIcon/>
                               </InputAdornment>
                           )
                       }}/>
            <TextField sx={{mt: 4}} label="Password" type="password" autoComplete="current-password"
                       onChange={e => updatePassword(e)} InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <LockIcon/>
                    </InputAdornment>
                )
            }}/>
            <Button sx={{mt: 3}} type="submit" variant="contained">Submit</Button>
            <Button sx={{mt: 1, mb: 1}} onClick={() => setDisplaySignUp(true)}>Go to sign up</Button>
            <Toaster/>
        </form>
    );
};

export default SignIn;