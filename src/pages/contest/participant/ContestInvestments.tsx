import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Grid,
	List,
	ListItem,
	Typography,
} from "@mui/material";
import type { Investment } from "../../../investment/investmentTypes";

interface Props {
	investments: Investment[];
}

export default function ContestInvestments({ investments }: Props) {
	return (
		<Accordion defaultExpanded disableGutters>
			<AccordionSummary>
				<Typography component="span">Investments</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<List>
					{investments.map((investment, index) => (
						<ListItem key={index}>
							<Grid container spacing={1} bgcolor="orange">
								<Grid size={6}>
									<Typography>{investment.symbol}</Typography>
								</Grid>
								<Grid size={6}>
									<Typography>Amount: {investment.amount}</Typography>
								</Grid>
								<Grid size={6}>
									<Typography>Value : {investment.totalValue} USD</Typography>
								</Grid>
								<Grid size={6}>
									<Typography>
										Profit: {investment.totalProfit.toFixed(2)} USD
									</Typography>
								</Grid>
							</Grid>
						</ListItem>
					))}
				</List>
			</AccordionDetails>
		</Accordion>
	);
}
