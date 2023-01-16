import {useMutation} from "react-query";
import {useLocation, useNavigate} from "react-router-dom";
import {queryClient} from "../config/queryConfig";
import {contestStatusMap} from "../util/constants";
import {Contest} from "../types/contest";
import {makeStyles} from "@mui/styles";
import {useApiWrapper} from "../config/apiWrapper";
import {getUpdateContestConfig} from "./api/adminApi";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import Button from "@mui/material/Button";


const useFormStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2px",

        '& .MuiTextField-root': {
            margin: "20px",
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: "20px",
        },
    },
}))

export type UpdateContestInput = {
    contestNumber: number,
    startTime: string,
    contestStatus: string,
}

const AdminUpdateContest = () => {
    const {root} = useFormStyles()
    const {state} = useLocation()
    const navigate = useNavigate()
    const contest = state as Contest
    const {handleSubmit, control} = useForm<UpdateContestInput>()
    const {apiPut} = useApiWrapper()

    function getStatusCode(value: string) {
        return [...contestStatusMap].find(([key, val]) => val === value)![0]
    }

    const mutation = useMutation({
        mutationFn: (contestData: UpdateContestInput) => {
            return apiPut(getUpdateContestConfig(contestData))
        },
        onSuccess: () => queryClient.invalidateQueries("getAllContestsAdmin")
    })

    const submitForm: SubmitHandler<UpdateContestInput> = data => {
        mutation.mutate(data)
    }

    return (
        <form className={root} onSubmit={handleSubmit(submitForm)}>
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
                                <MenuItem key={val} value={val}>{val}</MenuItem>)}
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
        </form>
    )
}

export default AdminUpdateContest