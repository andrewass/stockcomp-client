import { type AutocompleteRenderInputParams, TextField } from "@mui/material";
import type { ReactNode } from "react";
import { useThemeContext } from "../../theme/AppThemeContext";
import { customBorderColor } from "../../theme/themes";

interface Props {
	label: string;
	name?: string;
	autoCompleteParams?: AutocompleteRenderInputParams;
	error?: boolean | undefined;
	fullWidth?: boolean | undefined;
	helperText?: ReactNode;
	value?: string | number | undefined;
}

export default function StyledTextField({
	autoCompleteParams,
	...rest
}: Props) {
	const { appTheme } = useThemeContext();
	const contrastColor = appTheme.palette.primary.contrastText;

	return (
		<TextField
			{...autoCompleteParams}
			{...rest}
			sx={{
				"& label": { color: contrastColor },
				"& label.Mui-focused": { color: contrastColor },
				"& .MuiOutlinedInput-root": {
					"& fieldset": {
						borderColor: customBorderColor,
					},
					"&.Mui-focused fieldset": {
						borderColor: customBorderColor,
					},
					"&:hover fieldset": {
						borderColor: contrastColor,
					},
					"&.Mui-focused:hover fieldset": {
						borderColor: contrastColor,
					},
				},
			}}
		/>
	);
}
