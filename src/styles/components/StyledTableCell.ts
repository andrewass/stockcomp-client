import { styled } from "@mui/material/styles";
import { TableCell } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  fontWeight: 600,
  fontSize: "0.9rem",
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderBottom: "none",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    padding: "16px",
  },
}));
