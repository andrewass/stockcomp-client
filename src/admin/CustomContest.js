import React from "react";
import {
    BooleanInput,
    Datagrid,
    DateField,
    DateTimeInput,
    Edit,
    Create,
    EditButton,
    EmailField,
    List,
    NumberInput,
    SimpleForm,
    TextField,
    TextInput
} from 'react-admin';


const ContestList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <DateField source="startTime" showTime/>
            <EmailField source="contestNumber"/>
            <TextField source="running"/>
            <TextField source="completed"/>
            <TextField source="leaderboardUpdateStatus"/>
            <EditButton/>
        </Datagrid>
    </List>
);


const ContestEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id"/>
            <DateTimeInput source="startTime"/>
            <NumberInput source="contestNumber"/>
            <BooleanInput source="running"/>
            <BooleanInput source="completed"/>
        </SimpleForm>
    </Edit>
);


const ContestCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <DateTimeInput source="startTime"/>
            <NumberInput source="contestNumber"/>
        </SimpleForm>
    </Create>
);

export {
    ContestList, ContestEdit, ContestCreate
}