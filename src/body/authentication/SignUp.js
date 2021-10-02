import React, {useContext, useState} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import {UserContext} from "../../context/UserContext";
import {useHistory} from "react-router-dom";
import {signUp, updateLocalStorage} from "../../service/authService";
import {makeStyles} from "@mui/styles";
import {InputAdornment, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";

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

const SignUp = ({setDisplaySignUp}) => {

    const classes = useStyles();
    const {setIsSignedIn} = useContext(UserContext);
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");
    const [email, setEmail] = useState("");

    const matchingPasswords = () => {
        return password.length > 0 && password === retypedPassword;
    };

    const updateUsername = (event) => {
        setUsername(event.target.value);
    };

    const updatePassword = (event) => {
        setPassword(event.target.value);
    };

    const updateRetypedPassword = (event) => {
        setRetypedPassword(event.target.value);
    };

    const updateEmail = (event) => {
        setEmail(event.target.value);
    };

    const postSignUpToServer = async (event) => {
        event.preventDefault();
        if (matchingPasswords()) {
            await signUp(username, password, email)
            updateLocalStorage("true");
            setIsSignedIn(true);
            history.push("/stocks");
        } else {
            setPassword("");
            setRetypedPassword("");
        }
    };

    return (
        <form className={classes.root} onSubmit={postSignUpToServer} id="signInForm">
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
            <TextField sx={{mt: 4}} label="Email" onChange={e => updateEmail(e)}
                       InputProps={{
                           startAdornment: (
                               <InputAdornment position="start">
                                   <EmailIcon/>
                               </InputAdornment>
                           )
                       }}/>
            <TextField sx={{mt: 4}} label="Password" type="password" onChange={e => updatePassword(e)}
                       InputProps={{
                           startAdornment: (
                               <InputAdornment position="start">
                                   <LockIcon/>
                               </InputAdornment>
                           )
                       }}/>
            <TextField sx={{mt: 4}} label="Confirm Password" type="password" onChange={e => updateRetypedPassword(e)}
                       InputProps={{
                           startAdornment: (
                               <InputAdornment position="start">
                                   <LockIcon/>
                               </InputAdornment>
                           )
                       }}/>
            <Button sx={{mt: 3}} type="submit" variant="contained" >Submit</Button>
            <Button sx={{mt: 1, mb: 1}} onClick={() => setDisplaySignUp(false)}>Go to sign in</Button>
        </form>
    );
};

export default SignUp;