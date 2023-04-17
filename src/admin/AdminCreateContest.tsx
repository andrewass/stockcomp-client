import {Box, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useApiWrapper} from "../config/apiWrapper";
import {getCreateContestConfig} from "./api/adminApi";
import Button from "@mui/material/Button";


export type CreateContestInput = {
    contestNumber: number
    startTime: string
    contestName: string
}

const AdminCreateContest = () => {

    const navigate = useNavigate();
    const {handleSubmit, control} = useForm<CreateContestInput>();
    const {apiPost} = useApiWrapper();

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
        <Box component="form" onSubmit={handleSubmit(submitForm)}
             sx={{
                 display: "flex", flexFlow: "column nowrap",
                 width: "400px", margin: "auto", mt: "100px"
             }}>
            <Controller
                name="contestNumber"
                control={control}
                rules={{required: "Contest number is required"}}
                render={({field: {onChange, value}}) => (
                    <TextField
                        label="Contest Number"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        sx={{mb: "20px"}}
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
            <Button variant="outlined" type="submit" sx={{mt: "20px"}}>
                Create
            </Button>
        </Box>
    )
}

export default AdminCreateContest