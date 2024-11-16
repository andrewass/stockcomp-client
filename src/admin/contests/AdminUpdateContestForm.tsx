import {useMutation} from "@tanstack/react-query";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import {useApiWrapper} from "../../config/useApiWrapper";
import {queryClient} from "../../config/queryConfig";
import {Contest, CONTEST_STATUS, contestStatusMap, UpdateContestInput} from "../../domain/contests/contestTypes";
import {GET_ALL_CONTESTS, getUpdateContestConfig} from "../../domain/contests/contestApi";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
/*
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

 */


export const AdminUpdateContestForm = ({contest}: { contest: Contest }) => {
    const [open, setOpen] = useState(false);
    const {handleSubmit, control} = useForm<UpdateContestInput>();
    const {apiPut} = useApiWrapper();

    const mutation = useMutation({
        mutationFn: (contestData: UpdateContestInput) => {
            return apiPut(getUpdateContestConfig(contestData));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [GET_ALL_CONTESTS]})
                .then(handleClose);
        }
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submitForm: SubmitHandler<UpdateContestInput> = data => {
        mutation.mutate(data);
    }

    return (
        <React.Fragment>
            <IconButton disabled={contest.contestStatus === CONTEST_STATUS.COMPLETED} onClick={handleOpen}>
                <EditIcon/>
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Contest</DialogTitle>
                <DialogContent>
                    <Controller
                        name="contestNumber"
                        defaultValue={contest.contestNumber}
                        control={control}
                        rules={{required: "Contest number is required"}}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                sx={{mb: "1rem"}}
                                label="Contest Number"
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />
                    <Controller
                        name="contestStatus"
                        defaultValue={contest.contestStatus}
                        control={control}
                        render={({field}) => (
                            <FormControl sx={{mb: "1rem"}}>
                                <InputLabel>Contest Status</InputLabel>
                                <Select label="Contest Status "{...field}>
                                    {[...contestStatusMap].map(([key, val]) =>
                                        <MenuItem key={val} value={key}>{val}</MenuItem>)}
                                </Select>
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="startTime"
                        control={control}
                        defaultValue={contest.startTime}
                        render={({field: {onChange, value}}) => (
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker disabled={mutation.isPending}
                                                renderInput={(props) => <TextField {...props} />}
                                                label="Starting Time" value={value}
                                                onChange={onChange}
                                />
                            </LocalizationProvider>
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="button" sx={{mt: "1rem"}} onClick={handleSubmit(submitForm)}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}