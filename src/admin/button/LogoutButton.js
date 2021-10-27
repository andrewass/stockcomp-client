import {Responsive} from "react-admin";
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import {useContext} from "react";
import {UserContext} from "../../context/UserContext";
import {useHistory} from "react-router-dom";
import {signOut} from "../../service/authService";

const LogoutButton = () => {

    const {setIsSignedIn} = useContext(UserContext);
    const history = useHistory();

    const signOutAdmin = () =>  {
        setIsSignedIn(false);
        signOut();
        history.push("/");
    }

    return (
        <Responsive
            xsmall={
                <MenuItem onClick={signOutAdmin}>
                    <LogoutIcon/> Logout
                </MenuItem>
            }
            medium={
                <Button onClick={signOutAdmin} size="small">
                    <LogoutIcon/> Logout
                </Button>
            }
        />
    );
};

export default LogoutButton;