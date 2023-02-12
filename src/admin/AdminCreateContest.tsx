import {TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {makeStyles} from "@mui/styles";
import {useApiWrapper} from "../config/apiWrapper";
import {getCreateContestConfig} from "./api/adminApi";
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
}));

export type CreateContestInput = {
    contestNumber: number
    startTime: string
    contestName: string
}

const AdminCreateContest = () => {

    const {root} = useFormStyles()
    const navigate = useNavigate()
    const {handleSubmit, control} = useForm<CreateContestInput>()
    const {apiPost} = useApiWrapper()

    const mutation = useMutation({
        mutationFn: (contestData: CreateContestInput) => {
            return apiPost(getCreateContestConfig(contestData));
        },
        onSuccess: () => navigate("/admin/contests")
    });

    const submitForm: SubmitHandler<CreateContestInput> = data => {
        mutation.mutate(data);
    }

    return (
        <form className={root} onSubmit={handleSubmit(submitForm)}>
            <Controller
                name="contestNumber"
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
            <Controller
                name="startTime"
                control={control}
                render={({field: {onChange, value}}) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker disabled={mutation.isLoading}
                                        renderInput={(props) => <TextField {...props} />}
                                        label="Starting Time"
                                        value={value}
                                        onChange={onChange}
                        />
                    </LocalizationProvider>
                )}
            />
            <Button variant="outlined" type="submit">
                Create
            </Button>
        </form>
    )
}

export default AdminCreateContest