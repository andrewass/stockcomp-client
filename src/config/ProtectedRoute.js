import {useAuth} from "react-oidc-context";
import {CircularProgress} from "@mui/material";
import ErrorComponent from "../components/common/ErrorComponent";

const ProtectedRoute = ({children}) => {
    const auth = useAuth();

    if (auth.isLoading) {
        return <CircularProgress/>
    }
    if (auth.isAuthenticated) {
        return children;
    }
    auth.signinRedirect().catch(error => <ErrorComponent errorMessage={error}/>);

    return <></>
}

export default ProtectedRoute;
