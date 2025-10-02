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
import { useMutation } from "@tanstack/react-query";
import { createLink, Link } from "@tanstack/react-router";
import React from "react";
import toast from "react-hot-toast";
import StyledButton from "../../../components/button/StyledButton";
import { queryClient } from "../../../config/queryConfig";
import { useApiWrapper } from "../../../config/useApiWrapper";
import {
	type Contest,
	contestStatusRecord,
	getStatusByColor,
} from "../../../domain/contests/contestTypes";
import {
	GET_ALL_REGISTERED_CONTESTS,
	GET_ALL_UNREGISTERED_CONTESTS,
	getSignUpParticipantConfig,
} from "../../../domain/participant/participantApi";
import { useThemeContext } from "../../../theme/AppThemeContext";
import { formatDate } from "../../../util/dateUtils";

interface Props {
	contest: Contest;
}

const CustomLink = createLink(MUILink);

const UnregisteredContest = ({ contest }: Props) => {
	const { apiPost } = useApiWrapper();
	const { appTheme } = useThemeContext();

	const mutation = useMutation({
		mutationFn: () => {
			return apiPost(getSignUpParticipantConfig(contest.contestId));
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [GET_ALL_REGISTERED_CONTESTS],
			});
			await queryClient.invalidateQueries({
				queryKey: [GET_ALL_UNREGISTERED_CONTESTS],
			});
		},
		onError: () => {
			toast.error("Unable to sign up for contest", {
				duration: 4000,
				position: "top-center",
			});
		},
	});

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
						<StyledButton
							onClick={() => mutation.mutate()}
							buttonText="Sign Up"
						/>
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default UnregisteredContest;
