import React from "react";
import {Admin} from "react-admin";
import restProvider from "ra-data-simple-rest";

const dataProvider = restProvider("http://localhost:8080");

const AdminPage = () => {

    return(
        <Admin dataProvider={dataProvider}/>
    )
}

export default AdminPage;