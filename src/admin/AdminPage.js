import React from "react";
import {Admin, EditGuesser, Resource} from "react-admin";
import restProvider from "ra-data-simple-rest";
import {ContestCreate, ContestEdit, ContestList} from "./CustomContest";
import {UserList} from "./CustomUser";
import {authProvider} from "./authProvider";

const dataProvider = restProvider("http://localhost:8080");

export const AdminPage = () => (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="admin/contests" list={ContestList} edit={ContestEdit} create={ContestCreate}/>
        <Resource name="admin/users" list={UserList} edit={EditGuesser}/>
    </Admin>
);