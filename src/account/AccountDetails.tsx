import {Avatar, Box, Card, CardActions, CardContent, CircularProgress, Typography} from "@mui/material";
import {useQuery} from "react-query";
import {useApiWrapper} from "../config/apiWrapper";
import {deepPurple} from "@mui/material/colors";
import {AccountDetailsForm} from "./AccountDetailsForm";
import {AccountData} from "./accountDetailTypes";
import ErrorComponent from "../error/ErrorComponent";
import {GET_ACCOUNT_DETAILS, getAccountDetailsConfig} from "./api/accountApi";
import ReactCountryFlag from "react-country-flag";


const AccountDetails = () => {
    const {apiGet} = useApiWrapper();

    const {isLoading, isFetching, error, data: accountData} = useQuery<AccountData>(GET_ACCOUNT_DETAILS,
        () => apiGet(getAccountDetailsConfig()));

    if (isLoading || isFetching) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    return (
        <Box sx={{width: "400px", m: "0 auto", mt: "80px"}}>
            <Card>
                <CardContent>
                    <Avatar sx={{
                        width: 56, height: 56, bgcolor: deepPurple[500]
                    }}>OP</Avatar>
                    <Typography sx={{mt:"20px"}}>
                        Username: {accountData!.username}
                    </Typography>
                    <Typography sx={{mt:"20px"}}>
                        Full name : {accountData!.fullName ? accountData!.fullName : "N/A"}
                    </Typography>
                    <Box display="flex" flexDirection="row" sx={{mt: "20px"}} alignItems="center">
                        <Typography sx={{mr: "5px"}}>
                            Country :
                        </Typography>
                        <ReactCountryFlag  style={{
                            width: "2em",
                            height: "2em",
                        }} countryCode={accountData!.country} svg/>
                    </Box>
                </CardContent>
                <CardActions>
                    <AccountDetailsForm accountData={accountData!}/>
                </CardActions>
            </Card>
        </Box>
    );
}

export default AccountDetails;