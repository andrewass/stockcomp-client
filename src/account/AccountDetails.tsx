import {Avatar, Box, Card, CardActions, CardContent, CircularProgress, Typography} from "@mui/material";
import {useQuery} from "react-query";
import {useApiWrapper} from "../config/apiWrapper";
import {deepPurple} from "@mui/material/colors";
import {AccountDetailsForm} from "./AccountDetailsForm";
import {AccountData} from "./accountDetailTypes";
import ErrorComponent from "../error/ErrorComponent";
import {GET_ACCOUNT_DETAILS, getAccountDetailsConfig} from "./api/accountApi";


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
                    <Typography>
                        Username: {accountData!.username}
                    </Typography>
                    <Typography>
                        {accountData!.username}
                    </Typography>
                </CardContent>
                <CardActions>
                    <AccountDetailsForm accountData={accountData!}/>
                </CardActions>
            </Card>
        </Box>
    );
}

export default AccountDetails;