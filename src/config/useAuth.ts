import {useApiWrapper} from "./useApiWrapper";

export const useAuth = () => {

    const {apiGet} = useApiWrapper();

    const isSignedIn = () => {

    }

    const signOut = () => {

    }

    return {isSignedIn}
}