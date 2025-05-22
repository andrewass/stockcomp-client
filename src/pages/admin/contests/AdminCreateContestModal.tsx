import React, {useState} from "react";
import {Box, Button, Dialog, DialogContent, DialogTitle, Stack} from "@mui/material";
import {SubmitHandler, useForm } from "react-hook-form";
import { CreateContestRequest } from "../../../domain/contests/contestDto";
import { useApiWrapper } from "../../../config/useApiWrapper";
import { useMutation } from "@tanstack/react-query";
import {GET_ALL_CONTESTS, getCreateContestConfig } from "../../../domain/contests/contestApi";
import { queryClient } from "../../../config/queryConfig";
import ControlledTextField from "../../../components/form/ControlledTextField";
import ControlledDateTimePicker from "../../../components/form/ControlledDateTimePicker";


export default function AdminCreateContestModal() {
    const [open, setOpen] = useState(false);
    const {handleSubmit, control} = useForm<CreateContestRequest>();

    const {apiPost} = useApiWrapper();

    const mutation = useMutation({
        mutationFn: (contestData: CreateContestRequest) => {
            return apiPost(getCreateContestConfig(contestData));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [GET_ALL_CONTESTS]})
                .then(handleClose);
        }
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const submitForm: SubmitHandler<CreateContestRequest> = data => mutation.mutate(data);

    return (
        <Box>
            <Button onClick={handleOpen}>
                Create Contest
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Contest</DialogTitle>
                <DialogContent>
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
                                rules={{required: "Contest name is required"}}
                            />
                            <ControlledDateTimePicker
                                name="startTime"
                                label="Starting Time"
                                control={control}
                                disabled={mutation.isPending}
                                rules={{required: "Starting time is required"}}
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
                </DialogContent>
            </Dialog>
        </Box>
    );
}
