import {useAuth} from "react-oidc-context";
import {CircularProgress} from "@mui/material";

interface Props{
    children: JSX.Element[]
}

const ProtectedRoute = ({children}: Props) => {

    const auth = useAuth();
    if (auth.isLoading) {
        return <CircularProgress/>
    }
    if (auth.isAuthenticated) {
        return <>{children}</>
    }
    auth.signinRedirect().catch(error => console.log("Error: "+error));

    return <></>
}

export default ProtectedRoute;
