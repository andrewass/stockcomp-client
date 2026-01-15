import { Link as MuiLink } from "@mui/material";
import Link from "next/link";
import type React from "react";
import type { UrlObject } from "url";

interface Props {
	href: UrlObject;
	children: React.ReactNode;
}

export default function StyledLink({ href, children }: Props) {
	return (
		<MuiLink component={Link} href={href}>
			{children}
		</MuiLink>
	);
}
