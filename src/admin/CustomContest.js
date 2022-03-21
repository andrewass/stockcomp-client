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
import {CONTEST_STATUS, decodeMap} from "../util/constants";


const contestStatusList = [
    {id: CONTEST_STATUS.AWAITING_START, name: decodeMap.get(CONTEST_STATUS.AWAITING_START)},
    {id: CONTEST_STATUS.RUNNING, name: decodeMap.get(CONTEST_STATUS.RUNNING)},
    {id: CONTEST_STATUS.STOPPED, name: decodeMap.get(CONTEST_STATUS.STOPPED)},
    {id: CONTEST_STATUS.COMPLETED, name: decodeMap.get(CONTEST_STATUS.COMPLETED)}
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