import { Tab } from "@mui/material";
import { useThemeContext } from "@/theme/AppThemeContext.ts";

interface Props {
	label: string;
	value: string;
}

export default function StyledTab({ label, value, ...rest }: Props) {
	const { appTheme } = useThemeContext();

	return (
		<Tab
			label={label}
			value={value}
			sx={{
				color: appTheme.palette.primary.contrastText,
				"&.Mui-selected": {
					color: appTheme.palette.primary.contrastText,
				},
			}}
			{...rest}
		></Tab>
	);
}
