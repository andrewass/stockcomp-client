import {User} from "oidc-client-ts";
import {AUTH_SERVER_URL, CLIENT_ID, REDIRECT_URI} from "./properties";

export const oidcConfig = {
    authority: AUTH_SERVER_URL,
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
};

export const onSignInCallback = (_user: User | void): void => {
    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    )
}
