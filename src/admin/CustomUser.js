import React from "react";
import {Datagrid, EditButton, EmailField, List, TextField} from 'react-admin';

const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="username"/>
            <EmailField source="email"/>
            <TextField source="userRole"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export {
    UserList
}