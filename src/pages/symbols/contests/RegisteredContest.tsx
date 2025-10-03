import CircleIcon from "@mui/icons-material/Circle";
import {
	Card,
	CardActionArea,
	CardContent,
	Link as MUILink,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import { createLink, Link } from "@tanstack/react-router";
import {
	type Contest,
	contestStatusRecord,
	getStatusByColor,
} from "../../../domain/contests/contestTypes";
import { useThemeContext } from "../../../theme/AppThemeContext";
import { formatDate } from "../../../util/dateUtils";

interface Props {
	contest: Contest;
}

const RegisteredContest = ({ contest }: Props) => {
	const { appTheme } = useThemeContext();

	const CustomLink = createLink(MUILink);

	return (
		<Card elevation={0}>
			<CardActionArea
				component={CustomLink}
				to={`/contests/${contest.contestId}`}
			>
				<CardContent>
					<Stack gap={1}>
						<Stack direction="row" gap={0.5}>
							<Typography
								component={Link}
								to={`/contests/${contest.contestId}`}
								sx={{
									textDecoration: "none",
									color: appTheme.palette.primary.contrastText,
								}}
							>
								{contest.contestName}
							</Typography>
							<Tooltip
								title={contestStatusRecord[contest.contestStatus]}
								placement="top"
							>
								<CircleIcon
									sx={{ color: getStatusByColor(contest), marginRight: 1 }}
								/>
							</Tooltip>
						</Stack>
						<Typography>Ending {formatDate(contest.endTime)}</Typography>
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default RegisteredContest;
