import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import type React from "react";
import type { ReactNode } from "react";
import { useThemeContext } from "../../theme/AppThemeContext";

interface Props {
	open: boolean;
	onClose: () => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	title: string;
	children: ReactNode;
}

export default function StyledModalForm({
	open,
	children,
	onClose,
	onSubmit,
	title,
}: Props) {
	const { appTheme } = useThemeContext();

	return (
		<Box>
			<Dialog open={open} onClose={onClose}>
				<DialogTitle sx={{ backgroundColor: appTheme.palette.secondary.main }}>
					{title}
				</DialogTitle>
				<DialogContent
					sx={{ backgroundColor: appTheme.palette.secondary.main }}
				>
					<Box
						component="form"
						onSubmit={onSubmit}
						sx={{
							maxWidth: "400px",
							margin: "auto",
							mt: 8,
						}}
					>
						{children}
					</Box>
				</DialogContent>
			</Dialog>
		</Box>
	);
}
