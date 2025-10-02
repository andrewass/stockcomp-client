import { Stack } from "@mui/material";
import RegisteredContests from "./RegisteredContests";
import UnregisteredContests from "./UnregisteredContests";

export const ContestsMenu = () => {
	return (
		<Stack direction="column" spacing={6}>
			<UnregisteredContests />
			<RegisteredContests />
		</Stack>
	);
};
