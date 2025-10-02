import { Box, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useApiWrapper } from "../config/useApiWrapper";
import ErrorComponent from "../error/ErrorComponent";
import { GET_USER_DETAILS, getUserDetailsConfig } from "./api/userApi";
import { UserGeneralDetails } from "./UserGeneralDetails";
import { UserLeaderboardDetails } from "./UserLeaderboardDetails";
import type { UserExtended } from "./userTypes";

interface Props {
	username: string;
}

export const UserDetails = ({ username }: Props) => {
	const { apiGet } = useApiWrapper();

	const {
		isLoading,
		error,
		data: userData,
	} = useQuery<UserExtended>({
		queryKey: [GET_USER_DETAILS, username],
		queryFn: () => apiGet(getUserDetailsConfig(username!)),
	});

	if (isLoading) return <CircularProgress />;

	if (error) return <ErrorComponent error={error} />;

	return (
		<Box>
			<UserGeneralDetails userData={userData!} />
			<UserLeaderboardDetails username={"placeholder-name"} />
		</Box>
	);
};
