import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
	Collapse,
	List,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import { useState } from "react";
import type { Investment } from "../../../domain/investment/investmentTypes.ts";
import InvestmentDetails from "../../../investment/InvestmentDetails";

const InvestmentList = ({ investments }: { investments: Investment[] }) => {
	const [open, setOpen] = useState(false);

	return (
		<List>
			<ListItemButton sx={{ p: 0 }} onClick={() => setOpen(!open)}>
				<ListItemText
					primary={<Typography variant="h5">Investments</Typography>}
				/>
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open} unmountOnExit>
				<List
					sx={{ width: "100%", maxHeight: "20rem", overflow: "auto", ml: 2 }}
					component="div"
					disablePadding
				>
					{investments.map((investment) => (
						<InvestmentDetails
							key={investment.symbol}
							investment={investment}
						/>
					))}
				</List>
			</Collapse>
		</List>
	);
};

export default InvestmentList;
