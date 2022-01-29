import GoogleLogin from "react-google-login";

const handleSuccess = (response) => {
    console.log(response);
}

const handleFailure = (error) => {
    console.log(error);
}

const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;

export const SignInGoogle = () => {
    return (
        <GoogleLogin clientId={clientId}
                     buttonText={"Sign in with Google"}
                     onSuccess={handleSuccess}
                     onFailure={handleFailure}
                     cookiePolicy={"single_host_origin"}
        />
    );
}