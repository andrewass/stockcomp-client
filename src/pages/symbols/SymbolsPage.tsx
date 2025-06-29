import { SymbolsRightMenu } from "./right/SymbolsRightMenu";
import { Box, Divider, Stack } from "@mui/material";
import React from "react";
import SearchField from "../../search/SearchField";
import SymbolGrid from "./left/SymbolGrid";

const SymbolsPage = () => {
  return (
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
          <SymbolsRightMenu />
        </Box>
      </Stack>
    </Stack>
  );
};

export default SymbolsPage;
