import {
    Create,
    Datagrid,
    DateField,
    DateTimeInput,
    Edit,
    EditButton,
    EmailField,
    List,
    NumberInput,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput
} from 'react-admin';
import {CompleteTasksButton} from "./button/CompleteTasksButton";
import {StartTasksButton} from "./button/StartTasksButton";
import {StopTasksButton} from "./button/StopTasksButton";


const contestStatusList = [
    {id: "Awaiting Start", name: "Awaiting Start"},
    {id: "Running", name: "Running"},
    {id: "Stopped", name: "Stopped"},
    {id: "Completed", name: "Completed"}
];

const ContestList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <DateField source="startTime" showTime/>
            <EmailField source="contestNumber"/>
            <TextField source="contestStatus"/>
            <TextField source="leaderboardUpdateStatus"/>
            <StartTasksButton/>
            <StopTasksButton/>
            <CompleteTasksButton/>
            <EditButton record={props.record}/>
        </Datagrid>
    </List>
);


const ContestEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id"/>
            <DateTimeInput source="startTime"/>
            <NumberInput source="contestNumber"/>
            <SelectInput source="contestStatus" choices={contestStatusList}/>
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