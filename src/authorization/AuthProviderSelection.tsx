import {Box} from "@mui/material";


export const AuthProviderSelection = () => {

    const loginUrl = "http://localhost:8088/login"


    return(
        <Box>
            <form action={loginUrl} method="get">
                <input type="submit" value="Press to log in"/>
            </form>
        </Box>
    )
}