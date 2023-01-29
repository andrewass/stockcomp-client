import {User} from "oidc-client-ts";

export const oidcConfig = {
    authority: "http://authserver.io",
    client_id: "lgTeMaPEZQleQYhYzRyWJjPjzpfRFE",
    client_secret: "DaFpLSjFbcXoEFfRsWxPLDnJObCsNV",
    redirect_uri: "http://stockcompclient.io/account"
};

export const onSignInCallback = (_user: User | void): void => {
    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    )
}
