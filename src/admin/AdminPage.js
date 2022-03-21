import {Admin, EditGuesser, Resource} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import {ContestCreate, ContestEdit, ContestList} from "./CustomContest";
import {UserList} from "./CustomUser";
import {authProvider} from "./authProvider";
import {LogoutButton} from "./button/LogoutButton";
import {verifyUserIsAdmin} from "../service/authService";
import {CircularProgress} from "@mui/material";
import {Redirect} from "react-router-dom";
import {useQuery} from "react-query";


const dataProvider = simpleRestProvider(process.env.REACT_APP_STOCK_CONTEST_BASE_URL);

export const AdminPage = () => {

    const verifyAdmin = async () => {
        const response = await verifyUserIsAdmin();
        return response.data;
    }

    const {isLoading, error, data: isAdmin} = useQuery("verifyAdmin", verifyAdmin);

    if (isLoading) return <CircularProgress/>;

    if (error) return `Error! ${error}`;

    if (isAdmin) {
        return (
            <Admin dataProvider={dataProvider} authProvider={authProvider} logoutButton={LogoutButton}>
                <Resource name="admin/contests" list={ContestList} edit={ContestEdit} create={ContestCreate}/>
                <Resource name="admin/users" list={UserList} edit={EditGuesser}/>
            </Admin>
        );
    } else {
        return <Redirect to="/symbols"/>;
    }
}