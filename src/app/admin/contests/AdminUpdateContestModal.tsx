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
import React, { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useUpdateContestMutation } from "@/admin/contests/useAdminContests.ts";
import ControlledDateTimeField from "@/components/form/ControlledDateTimeField.tsx";
import ControlledSelect from "@/components/form/ControlledSelect.tsx";
import ControlledTextField from "@/components/form/ControlledTextField.tsx";
import {
	CONTEST_STATUS,
	type Contest,
	contestStatusRecord,
} from "@/contest/contestTypes.ts";
import type { UpdateContestRequest } from "../../../domain/contests/contestDto";

export default function AdminUpdateContestModal({
	contest,
}: {
	contest: Contest;
}) {
	const [open, setOpen] = useState(false);
	const { handleSubmit, control } = useForm<UpdateContestRequest>({
		defaultValues: {
			contestName: contest.contestName,
			startTime: contest.startTime,
			contestStatus: contest.contestStatus,
			contestId: contest.contestId,
		},
	});

	const mutation = useUpdateContestMutation();

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
