import React from "react";
import {Datagrid, EditButton, EmailField, List, TextField} from 'react-admin';


export const ContestList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="startTime"/>
            <EmailField source="contestNumber"/>
            <TextField source="inPreStartMode"/>
            <TextField source="inRunningMode"/>
            <EditButton/>
        </Datagrid>
    </List>
);