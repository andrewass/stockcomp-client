import { Stack } from "@mui/material";
import UnregisteredContests from "./UnregisteredContests";
import RegisteredContests from "./RegisteredContests";

export const SymbolsRightMenu = () => {
  return (
    <Stack direction="column" spacing={6}>
      <UnregisteredContests />
      <RegisteredContests />
    </Stack>
  );
};
