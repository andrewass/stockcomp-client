import { Stack } from "@mui/material";
import {
	type Control,
	Controller,
	type FieldValues,
	type Path,
	type PathValue,
} from "react-hook-form";
import StyledTextField from "../input/StyledTextField";

interface Props<T extends FieldValues> {
	name: Path<T>;
	label: string;
	control: Control<T>;
	rules?: Record<string, string>;
	defaultValue?: PathValue<T, Path<T>>;
	disabled?: boolean;
}

export default function ControlledTextField<T extends FieldValues>({
	name,
	label,
	control,
	rules,
	defaultValue,
}: Props<T>) {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			rules={rules}
			render={({ field, fieldState }) => (
				<Stack>
					<StyledTextField
						{...field}
						label={label}
						fullWidth
						error={!!fieldState.error}
						helperText={fieldState.error?.message}
					/>
				</Stack>
			)}
		/>
	);
}
