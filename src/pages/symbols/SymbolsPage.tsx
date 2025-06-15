import { SymbolsRightMenu } from "./right/SymbolsRightMenu";
import { Box, Stack } from "@mui/material";
import React from "react";
import SearchField from "../../search/SearchField";
import SymbolGrid from "./left/SymbolGrid";

const SymbolsPage = () => {
  return (
    <Stack direction="column" gap={4}>
      <Box display="flex" sx={{ p: "40px 0", justifyContent: "center" }}>
        <SearchField />
      </Box>
      <Stack direction="row" gap={8}>
        <Box width="70%">
          <SymbolGrid />
        </Box>
        <Box width="30%">
          <SymbolsRightMenu />
        </Box>
      </Stack>
    </Stack>
  );
};

export default SymbolsPage;
