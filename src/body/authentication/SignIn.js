import React, {useState} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import {setSignedInToLocalStorage, signIn} from "../../service/authService";
import {useHistory} from "react-router-dom";
import {CircularProgress, InputAdornment, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {makeStyles} from "@mui/styles";
import toast, {Toaster} from "react-hot-toast";
import {useMutation} from "react-query";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "10% auto",
        border: "1px ridge black",
        [theme.breakpoints.up("md")]: {
            width: "30%"
        },
        [theme.breakpoints.down("md")]: {
            width: "80%"
        }
    }
}));

export const SignIn = ({setDisplaySignUp}) => {

    const classes = useStyles();
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const mutation = useMutation((credentials) => signIn(credentials),{
        onSuccess: (response) => {
            setSignedInToLocalStorage();
            response.data === 'ADMIN' ? history.push("/admin") : history.push("/stocks");
        },
        onError: () => {
            toast.error("Unable to sign in. Verify username and password is correct", {
                duration: 4000,
                position: "top-center"
            });
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        mutation.mutate({username, password});
    }

    if (mutation.isLoading) return <CircularProgress/>

    return (
        <form className={classes.root} onSubmit={handleSubmit} id="signInForm">
            <Typography variant="h4" sx={{mt: 4}}>
                STOCK COMP
            </Typography>
            <TextField sx={{mt: 4}} label="Username" onChange={e => setUsername(e.target.value)}
                       InputProps={{
                           startAdornment: (
                               <InputAdornment position="start">
                                   <AccountCircleIcon/>
                               </InputAdornment>
                           )
                       }}/>
            <TextField sx={{mt: 4}} label="Password" type="password" autoComplete="current-password"
                       onChange={e => setPassword(e.target.value)} InputProps={{
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