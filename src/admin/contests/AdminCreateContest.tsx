import {Box, Stack} from "@mui/material";
import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import {useApiWrapper} from "../../config/useApiWrapper";
import {getCreateContestConfig} from "../../domain/contests/contestApi";
import {CreateContestInput} from "../../domain/contests/contestTypes";
import ControlledTextField from "../../components/form/ControlledTextField";
import ControlledDateTimePicker from "../../components/form/ControlledDateTimePicker";


const AdminCreateContest = () => {

    const navigate = useNavigate();
    const {handleSubmit, control} = useForm<CreateContestInput>();
    const {apiPostVoid} = useApiWrapper();

    const mutation = useMutation({
        mutationFn: (contestData: CreateContestInput) => {
            return apiPostVoid(getCreateContestConfig(contestData));
        },
        onSuccess: () => navigate("/admin/contests")
    });

    const submitForm: SubmitHandler<CreateContestInput> = data => {
        mutation.mutate(data);
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(submitForm)}
            sx={{maxWidth: "400px", margin: "auto", mt: 8}}
        >
            <Stack spacing={3}>
                <ControlledTextField
                    name="contestName"
                    label="Contest Name"
                    control={control}
                    defaultValue={""}
                    rules={{required: "Contest number is required"}}
                />
                <ControlledDateTimePicker
                    name="startTime"
                    label="Starting Time"
                    control={control}
                    disabled={mutation.isPending}
                />
                <ControlledTextField
                    name="durationDays"
                    label="Contest Duration Days"
                    control={control}
                    defaultValue={30}
                    rules={{required: "Contest duration is required"}}
                />
                <Button variant="outlined" type="submit">
                    Create
                </Button>
            </Stack>
        </Box>
    )
}

export default AdminCreateContest
