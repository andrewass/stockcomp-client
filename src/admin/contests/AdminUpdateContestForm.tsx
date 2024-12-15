import {useMutation} from "@tanstack/react-query";
import {SubmitHandler, useForm} from "react-hook-form";
import {Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import {useApiWrapper} from "../../config/useApiWrapper";
import {queryClient} from "../../config/queryConfig";
import {Contest, CONTEST_STATUS, contestStatusRecord} from "../../domain/contests/contestTypes";
import {GET_ALL_CONTESTS, getUpdateContestConfig} from "../../domain/contests/contestApi";
import ControlledDateTimePicker from "../../components/form/ControlledDateTimePicker";
import ControlledTextField from "../../components/form/ControlledTextField";
import ControlledSelect from "../../components/form/ControlledSelect";
import {UpdateContestRequest} from "../../domain/contests/contestDto";


export const AdminUpdateContestForm = ({contest}: { contest: Contest }) => {
    const [open, setOpen] = useState(false);
    const {handleSubmit, control} = useForm<UpdateContestRequest>({
            defaultValues: {
                contestName: contest.contestName,
                startTime: contest.startTime,
                contestStatus: contest.contestStatus,
                contestId: contest.contestId
            }
        });
    const {apiPost} = useApiWrapper();

    const mutation = useMutation({
        mutationFn: (contestData: UpdateContestRequest) => {
            return apiPost(getUpdateContestConfig(contestData));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [GET_ALL_CONTESTS]})
                .then(handleClose);
        }
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submitForm: SubmitHandler<UpdateContestRequest> = data => {
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
                    <Stack spacing={3} sx={{mt: 2}}>
                        <ControlledTextField
                            name="contestName"
                            label="Contest Name"
                            control={control}
                            defaultValue={contest.contestName}
                        />
                        <ControlledSelect
                            name="contestStatus"
                            label="Contest Status"
                            control={control}
                            defaultValue={contest.contestStatus}
                            items={contestStatusRecord}
                        />
                        <ControlledDateTimePicker
                            name="startTime"
                            label="Starting Time"
                            control={control}
                            defaultValue={contest.startTime}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button type="button" onClick={handleSubmit(submitForm)}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
