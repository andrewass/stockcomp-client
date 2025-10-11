import EditIcon from "@mui/icons-material/Edit";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import ControlledDateTimeField from "../../../components/form/ControlledDateTimeField";
import ControlledSelect from "../../../components/form/ControlledSelect";
import ControlledTextField from "../../../components/form/ControlledTextField";
import { apiPost } from "../../../config/apiWrapper";
import { queryClient } from "../../../config/queryConfig";
import {
	GET_ALL_CONTESTS,
	getUpdateContestConfig,
} from "../../../domain/contests/contestApi";
import type { UpdateContestRequest } from "../../../domain/contests/contestDto";
import {
	CONTEST_STATUS,
	type Contest,
	contestStatusRecord,
} from "../../../domain/contests/contestTypes";

export const AdminUpdateContestModal = ({ contest }: { contest: Contest }) => {
	const [open, setOpen] = useState(false);
	const { handleSubmit, control } = useForm<UpdateContestRequest>({
		defaultValues: {
			contestName: contest.contestName,
			startTime: contest.startTime,
			contestStatus: contest.contestStatus,
			contestId: contest.contestId,
		},
	});

	const mutation = useMutation({
		mutationFn: (contestData: UpdateContestRequest) => {
			return apiPost(getUpdateContestConfig(contestData));
		},
		onSuccess: () => {
			queryClient
				.invalidateQueries({ queryKey: [GET_ALL_CONTESTS] })
				.then(handleClose);
		},
	});

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const submitForm: SubmitHandler<UpdateContestRequest> = (data) => {
		mutation.mutate(data);
	};

	return (
		<React.Fragment>
			<IconButton
				disabled={contest.contestStatus === CONTEST_STATUS.COMPLETED}
				onClick={handleOpen}
			>
				<EditIcon />
			</IconButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Update Contest</DialogTitle>
				<DialogContent>
					<Stack spacing={3} sx={{ mt: 2 }}>
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
						<ControlledDateTimeField
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
};
