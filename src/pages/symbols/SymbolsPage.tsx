import { ContestsMenu } from "./right/ContestsMenu";
import { Box, CircularProgress, Divider, Stack } from "@mui/material";
import React from "react";
import SearchField from "../../search/SearchField";
import SymbolGrid from "./left/SymbolGrid";
import { useApiWrapper } from "../../config/useApiWrapper";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../../error/ErrorComponent";
import {
  EXISTS_ACTIVE_CONTESTS,
  getExistsActiveContestsConfig,
} from "../../domain/contests/contestApi";

const SymbolsPage = () => {
  const { apiGet } = useApiWrapper();

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
