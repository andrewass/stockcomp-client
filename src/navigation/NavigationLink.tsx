import { Link as MUILink, Stack, Typography } from "@mui/material";
import { createLink } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface Props {
	to: string;
	text: string;
	icon: ReactNode;
}

const CustomLink = createLink(MUILink);

export default function NavigationLink({ to, text, icon }: Props) {
	return (
		<CustomLink to={to}>
			<Stack direction="row" gap={1}>
				{icon}
				<Typography>{text}</Typography>
			</Stack>
		</CustomLink>
	);
}
