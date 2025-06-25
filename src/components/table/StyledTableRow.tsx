import { ReactNode } from "react";
import { lightTheme } from "../../theme/themes";
import { TableRow } from "@mui/material";
import { useThemeContext } from "../../theme/AppThemeContext";

interface Props {
  children: ReactNode;
  rowId: number;
}

export default function StyledTableRow({ children, rowId }: Props) {
  const { appTheme } = useThemeContext();
  return (
    <TableRow
      key={rowId}
      sx={{
        backgroundColor:
          appTheme === lightTheme
            ? appTheme.palette.primary.main
            : appTheme.palette.secondary.main,
      }}
    >
      {children}
    </TableRow>
  );
}
