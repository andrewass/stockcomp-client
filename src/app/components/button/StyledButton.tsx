import { Button } from "@mui/material";
import { useThemeContext } from "@/theme/AppThemeContext.ts";
import { customBorderColor } from "@/theme/themes.ts";

interface Props {
	variant?: "outlined" | "contained" | "text";
	type?: "submit" | "button";
	buttonText: string;
	disabled?: boolean;
	onClick?: () => void;
}

export default function StyledButton({
	variant = "outlined",
	type = "button",
	buttonText,
	onClick,
	disabled,
	...rest
}: Props) {
	const { appTheme } = useThemeContext();

	return (
		<Button
			variant={variant}
			type={type}
			disabled={disabled}
			onClick={onClick}
			sx={{
				border: "0.5px solid",
				borderColor: customBorderColor,
				color: appTheme.palette.primary.contrastText,
				backgroundColor: appTheme.palette.secondary.main,
			}}
			{...rest}
		>
			{buttonText}
		</Button>
	);
}
