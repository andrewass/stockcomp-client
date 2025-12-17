import { Box, CircularProgress, Divider, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../../config/apiWrapper";
import {
	EXISTS_ACTIVE_CONTESTS,
	getExistsActiveContestsConfig,
} from "../../domain/contests/contestApi";
import ErrorComponent from "../../error/ErrorComponent";
import SearchField from "../../search/SearchField";
import ContestsMenu from "./contests/ContestsMenu";
import SymbolGrid from "./presentation/SymbolGrid";

const SymbolsPage = () => {
	const { isPending, isError, error, data } = useQuery({
		queryKey: [EXISTS_ACTIVE_CONTESTS],
		queryFn: () => apiGet(getExistsActiveContestsConfig()),
	});

	if (isError) return <ErrorComponent error={error} />;

	if (isPending) return <CircularProgress />;

	return data.existsActiveContests ? (
		<Stack direction="column" gap={8} alignItems="stretch">
			<Box display="flex" sx={{ justifyContent: "center" }}>
				<SearchField />
			</Box>
			<Stack direction="row" gap={8}>
				<Box width="70%">
					<SymbolGrid />
				</Box>
				<Divider orientation="vertical" flexItem />
				<Box width="30%">
					<ContestsMenu />
				</Box>
			</Stack>
		</Stack>
	) : (
		<Stack direction="column" gap={8} alignItems="stretch">
			<Box display="flex" sx={{ justifyContent: "center" }}>
				<SearchField />
			</Box>
			<Box width="70%" alignSelf="center">
				<SymbolGrid />
			</Box>
		</Stack>
	);
};

export default SymbolsPage;
