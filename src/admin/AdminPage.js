import {Admin, EditGuesser, Resource} from "react-admin";
import buildGraphQLProvider from "ra-data-graphql-simple";
import {ContestCreate, ContestEdit, ContestList} from "./CustomContest";
import {UserList} from "./CustomUser";
import {authProvider} from "./authProvider";
import {LogoutButton} from "./button/LogoutButton";
import {verifyUserIsAdmin} from "../service/authService";
import {CircularProgress} from "@mui/material";
import {Redirect} from "react-router-dom";
import {useQuery} from "react-query";
import {useEffect, useState} from "react";


export const AdminPage = () => {

    const [dataProvider, setDataProvider] = useState(null);

    useEffect(() => {
        buildGraphQLProvider({
            clientOptions: {uri: process.env.REACT_APP_STOCK_CONTEST_BASE_URL + "/graphql"},
            buildQuery: ""
        })
            .then(graphQlDataProvider => setDataProvider(() => graphQlDataProvider));
    }, []);

    const verifyAdmin = async () => {
        const response = await verifyUserIsAdmin();
        return response.data;
    }

    const {isLoading, error, data: isAdmin} = useQuery("verifyAdmin", verifyAdmin);

    if (isLoading || !dataProvider) return <CircularProgress/>;

    if (error) return `Error! ${error}`;

    if (isAdmin) {
        return (
            <Admin dataProvider={dataProvider} authProvider={authProvider} logoutButton={LogoutButton}>
                <Resource name="Contest" list={ContestList} edit={ContestEdit} create={ContestCreate}/>
                <Resource name="User" list={UserList} edit={EditGuesser}/>
            </Admin>
        );
    } else {
        return <Redirect to="/symbols"/>;
    }
}