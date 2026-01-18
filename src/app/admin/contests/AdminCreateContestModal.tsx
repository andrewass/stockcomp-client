import { Box, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useCreateContestMutation } from "@/admin/contests/useAdminContests.ts";
import StyledButton from "@/components/button/StyledButton.tsx";
import ControlledDateTimeField from "@/components/form/ControlledDateTimeField.tsx";
import ControlledTextField from "@/components/form/ControlledTextField.tsx";
import StyledModalForm from "@/components/form/StyledModalForm.tsx";
import type { CreateContestRequest } from "../../../domain/contests/contestDto";

export default function AdminCreateContestModal() {
	const [open, setOpen] = useState(false);
	const { handleSubmit, control } = useForm<CreateContestRequest>();

	const mutation = useCreateContestMutation();

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const submitForm: SubmitHandler<CreateContestRequest> = (data) =>
		mutation.mutate(data);

	return (
		<Box>
			<StyledButton buttonText="Create Contest" onClick={handleOpen} />
			<StyledModalForm
				open={open}
				onClose={handleClose}
				title="Create Contest"
				onSubmit={handleSubmit(submitForm)}
			>
				<Stack spacing={3} sx={{ mt: 1 }}>
					<Typography>
						Fill in the details below to create a new contest
					</Typography>
					<Divider />

					<ControlledTextField
						name="contestName"
						label="Contest Name"
						control={control}
						defaultValue={""}
						disabled={mutation.isPending}
						rules={{ required: "Contest name is required" }}
					/>
					<ControlledDateTimeField
						name="startTime"
						label="Starting Time"
						control={control}
						disabled={mutation.isPending}
						rules={{ required: "Starting time is required" }}
					/>
					<ControlledTextField
						name="durationDays"
						label="Contest Duration Days"
						control={control}
						defaultValue={30}
						disabled={mutation.isPending}
						rules={{ required: "Contest duration is required" }}
					/>

					<Divider sx={{ mt: 2 }} />

					<Stack direction="row" spacing={2}>
						<StyledButton
							variant="outlined"
							type="submit"
							buttonText="Create contest"
							disabled={mutation.isPending}
						/>
						<StyledButton
							variant="outlined"
							buttonText="Cancel"
							onClick={handleClose}
							disabled={mutation.isPending}
						/>
					</Stack>
				</Stack>
			</StyledModalForm>
		</Box>
	);
}
