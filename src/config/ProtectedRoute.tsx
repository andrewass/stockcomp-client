import {useAuth} from "react-oidc-context";
import {CircularProgress} from "@mui/material";

const ProtectedRoute = ({children}: { children: JSX.Element[] }) => {

    const auth = useAuth();
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
