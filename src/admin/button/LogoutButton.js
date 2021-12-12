import {Responsive} from "react-admin";
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import {useHistory} from "react-router-dom";
import {removeSignedInFromLocalStorage, signOut} from "../../service/authService";

const LogoutButton = () => {

    const history = useHistory();

    const signOutAdmin = async () => {
        await signOut().catch(error => console.log(error));
        removeSignedInFromLocalStorage();
        history.go(0);
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