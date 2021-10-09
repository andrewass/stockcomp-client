import React from "react";
import {Admin, EditGuesser, Resource} from "react-admin";
import restProvider from "ra-data-simple-rest";
import {ContestCreate, ContestEdit, ContestList} from "./CustomContest";
import {UserList} from "./CustomUser";
import {authProvider} from "./authProvider";
import LogoutButton from "./LogoutButton";

const dataProvider = restProvider(process.env.REACT_APP_STOCK_CONTEST_BASE_URL);

export const AdminPage = () => (
    <Admin dataProvider={dataProvider} authProvider={authProvider} logoutButton={LogoutButton}>
        <Resource name="admin/contests" list={ContestList} edit={ContestEdit} create={ContestCreate}/>
        <Resource name="admin/users" list={UserList} edit={EditGuesser}/>
    </Admin>
);