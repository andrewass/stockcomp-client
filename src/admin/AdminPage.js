import React from "react";
import {Admin, EditGuesser, Resource} from "react-admin";
import restProvider from "ra-data-simple-rest";
import {UserList} from "./UserList";
import {ContestList} from "./ContestList";

const dataProvider = restProvider("http://localhost:8080");

export const AdminPage = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="admin/contests" list={ContestList} edit={EditGuesser}/>
        <Resource name="admin/users" list={UserList}/>
    </Admin>
);