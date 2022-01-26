import React, {useState} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import {useHistory} from "react-router-dom";
import {setSignedInToLocalStorage, signUp} from "../../service/authService";
import {makeStyles} from "@mui/styles";
import {CircularProgress, InputAdornment, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useMutation} from "react-query";
import toast from "react-hot-toast";

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

export const SignUp = ({setDisplaySignUp}) => {

    const classes = useStyles();
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");
    const [email, setEmail] = useState("");

    const matchingPasswords = () => {
        return password.length > 0 && password === retypedPassword;
    };

    const mutation = useMutation((credentials) => signUp(credentials),{
        onSuccess: () => {
            setSignedInToLocalStorage();
            history.push("/stocks");
        },
        onError: () => {
            toast.error("Unable to sign up", {
                duration: 4000,
                position: "top-center"
            });
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        if (matchingPasswords()) {
            mutation.mutate({username, password, email});
        } else {
            setPassword("");
            setRetypedPassword("");
        }
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
            <TextField sx={{mt: 4}} label="Email" onChange={e => setEmail(e.target.value)}
                       InputProps={{
                           startAdornment: (
                               <InputAdornment position="start">
                                   <EmailIcon/>
                               </InputAdornment>
                           )
                       }}/>
            <TextField sx={{mt: 4}} label="Password" type="password" onChange={e => setPassword(e.target.value)}
                       InputProps={{
                           startAdornment: (
                               <InputAdornment position="start">
                                   <LockIcon/>
                               </InputAdornment>
                           )
                       }}/>
            <TextField sx={{mt: 4}} label="Confirm Password" type="password"
                       onChange={e => setRetypedPassword(e.target.value)}
                       InputProps={{
                           startAdornment: (
                               <InputAdornment position="start">
                                   <LockIcon/>
                               </InputAdornment>
                           )
                       }}/>
            <Button sx={{mt: 3}} type="submit" variant="contained">Submit</Button>
            <Button sx={{mt: 1, mb: 1}} onClick={() => setDisplaySignUp(false)}>Go to sign in</Button>
        </form>
    );
}