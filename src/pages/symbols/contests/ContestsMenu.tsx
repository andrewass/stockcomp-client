import { Stack } from "@mui/material";
import RegisteredContests from "./RegisteredContests";
import UnregisteredContests from "./UnregisteredContests";

export default function ContestsMenu() {
	return (
		<Stack direction="column" spacing={6}>
			<UnregisteredContests />
			<RegisteredContests />
		</Stack>
	);
}
