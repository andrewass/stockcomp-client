import {useMutation} from "react-query";
import {useLocation, useNavigate} from "react-router-dom";
import {queryClient} from "../config/queryConfig";
import {useApiWrapper} from "../config/apiWrapper";
import {getUpdateContestConfig} from "./api/adminApi";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import Button from "@mui/material/Button";
import {Contest, contestStatusMap} from "../contests/contestTypes";

export type UpdateContestInput = {
    contestNumber: number,
    startTime: string,
    contestStatus: string,
}

const AdminUpdateContest = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const contest = state as Contest;
    const {handleSubmit, control} = useForm<UpdateContestInput>();
    const {apiPut} = useApiWrapper();

    const mutation = useMutation({
        mutationFn: (contestData: UpdateContestInput) => {
            return apiPut(getUpdateContestConfig(contestData));
        },
        onSuccess: () => {
            queryClient.invalidateQueries("getAllContestsAdmin")
                .then(() => navigate("/admin/contests"));
        }
    });

    const submitForm: SubmitHandler<UpdateContestInput> = data => {
        mutation.mutate(data);
    }

    return (
        <Box component="form" onSubmit={handleSubmit(submitForm)}
             sx={{display: "flex", flexFlow: "column nowrap", maxWidth: "xs"}}>
            <Controller
                name="contestNumber"
                defaultValue={contest.contestNumber}
                control={control}
                rules={{required: "Contest number is required"}}
                render={({field: {onChange, value}}) => (
                    <TextField
                        label="Contest Number"
                        variant="filled"
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
            <FormControl>
                <InputLabel>Contest Status</InputLabel>
                <Controller
                    name="contestStatus"
                    defaultValue={contest.contestStatus}
                    control={control}
                    render={({field}) => (
                        <Select {...field}>
                            {[...contestStatusMap].map(([key, val]) =>
                                <MenuItem key={val} value={key}>{val}</MenuItem>)}
                        </Select>
                    )}
                />
            </FormControl>
            <Controller
                name="startTime"
                control={control}
                defaultValue={contest.startTime}
                render={({field: {onChange, value}}) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker disabled={mutation.isLoading}
                                        renderInput={(props) => <TextField {...props} />}
                                        label="Starting Time" value={value}
                                        onChange={onChange}
                        />
                    </LocalizationProvider>
                )}
            />
            <Button variant="outlined" type="submit">
                Update
            </Button>
        </Box>
    );
}

export default AdminUpdateContest