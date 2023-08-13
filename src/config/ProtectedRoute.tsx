import {CircularProgress} from "@mui/material";
import {useAuth} from "./useAuth";

const ProtectedRoute = ({children}: { children: JSX.Element[] }) => {
    const {isSignedIn} = useAuth();


    if (auth.isLoading) {
        return <CircularProgress/>
    }
    if (auth.isAuthenticated) {
        return <>{children}</>
    }
    auth.signinRedirect().catch(error => console.log("Error: " + error));

    return <></>
}

export default ProtectedRoute;
