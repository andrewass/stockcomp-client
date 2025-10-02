import { DateTimeField } from "@mui/x-date-pickers";
import { useThemeContext } from "../../theme/AppThemeContext";
import { customBorderColor } from "../../theme/themes";

interface Props {
	label: string;
	disabled?: boolean;
	value: Date | null;
	onChange: (value: Date | null) => void;
}

export default function StyledDateTimeField({
	value,
	label,
	onChange,
	disabled = false,
	...rest
}: Props) {
	const { appTheme } = useThemeContext();
	const contrastColor = appTheme.palette.primary.contrastText;

	return (
		<DateTimeField
			label={label}
			defaultValue={value}
			format="dd.MM.yyyy HH:mm"
			disabled={disabled}
			onChange={onChange}
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
