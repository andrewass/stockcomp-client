import { Box, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useApiWrapper } from "../config/useApiWrapper";
import { GET_USER_DETAILS, getUserDetailsConfig } from "../domain/user/userApi";
import type { User } from "../domain/user/userTypes";
import ErrorComponent from "../error/ErrorComponent";
import { UserGeneralDetails } from "./UserGeneralDetails";
import { UserLeaderboardDetails } from "./UserLeaderboardDetails";

interface Props {
	username: string;
}

export const UserDetails = ({ username }: Props) => {
	const { apiGet } = useApiWrapper();

	const {
		isLoading,
		error,
		data: userData,
	} = useQuery<User>({
		queryKey: [GET_USER_DETAILS, username],
		queryFn: () => apiGet(getUserDetailsConfig(username)),
	});

	if (isLoading) return <CircularProgress />;

	if (error) return <ErrorComponent error={error} />;

	return (
		<Box>
			<UserGeneralDetails userData={userData} />
			<UserLeaderboardDetails username={"placeholder-name"} />
		</Box>
	);
};
