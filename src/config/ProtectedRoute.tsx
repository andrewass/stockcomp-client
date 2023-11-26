import {useApiWrapper} from "./useApiWrapper";
import {useQuery} from "@tanstack/react-query";
import {GET_VALID_SESSION, getValidSessionConfig} from "../auth/api/authApi";
import {ValidSession} from "../auth/authTypes";
import {CircularProgress} from "@mui/material";
import ErrorComponent from "../error/ErrorComponent";

export const ProtectedRoute = ({children}: { children: JSX.Element[] }) => {

    const {apiGet} = useApiWrapper();

    const redirectToApi = () => {
        window.location.href = "http://stockcomp.io./api/login"
    }

    const {isLoading, data, error} =
        useQuery<ValidSession>(
            [GET_VALID_SESSION],
            () => apiGet(getValidSessionConfig())
        );

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    if (data!.validSession) {
        return <>{children}</>
    } else {
        return (
            <button onClick={() => redirectToApi()}>
                Log In
            </button>
        );
    }
}