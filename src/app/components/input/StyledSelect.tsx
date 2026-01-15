import { InputLabel, MenuItem, Select } from "@mui/material";
import { useThemeContext } from "../../theme/AppThemeContext";
import { customBorderColor } from "../../theme/themes";

type ItemMap = Record<string, string>;

interface Props {
	label: string;
	items: ItemMap;
}

export default function StyledSelect({ label, items, ...rest }: Props) {
	const { appTheme } = useThemeContext();
	const contrastColor = appTheme.palette.primary.contrastText;
	return (
		<>
			<InputLabel
				sx={{
					color: contrastColor,
					"&.Mui-focused": {
						color: contrastColor,
					},
				}}
			>
				{label}
			</InputLabel>
			<Select
				label={label}
				{...rest}
				sx={{
					color: contrastColor,
					"& .MuiOutlinedInput-notchedOutline": {
						borderColor: customBorderColor,
					},
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: contrastColor,
					},
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: contrastColor,
					},
				}}
			>
				{Object.entries(items).map(([key, val]) => (
					<MenuItem key={key} value={key}>
						{val}
					</MenuItem>
				))}
			</Select>
		</>
	);
}
