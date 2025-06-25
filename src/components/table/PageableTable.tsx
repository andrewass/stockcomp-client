import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { lightTheme } from "../../theme/themes";
import { useThemeContext } from "../../theme/AppThemeContext";
import { ReactNode, useEffect, useState } from "react";
import StyledTableRow from "./StyledTableRow";

export interface Column {
  id: string;
  label: string;
}

interface Props<T> {
  columns: Column[];
  fetchData: (
    page: number,
    pageSize: number,
  ) => Promise<{
    rows: T[];
    total: number;
  }>;
  renderRow: (row: T, key: number) => ReactNode;
}

export default function PageableTable<T>({
  columns,
  fetchData,
  renderRow,
}: Props<T>) {
  const { appTheme } = useThemeContext();
  const [totalEntriesCount, setTotalEntriesCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [rows, setRows] = useState<T[]>([]);

  useEffect(() => {
    fetchData(currentPage, rowsPerPage).then((data) => {
      setRows(data.rows);
      setTotalEntriesCount(data.total);
    });
  }, [currentPage, rowsPerPage]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    fetchData(newPage, rowsPerPage).catch((error) => console.error(error));
  };

  return (
    <Box sx={{ border: "4px solid", borderColor: "divider", borderRadius: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns
                .map((column) => column.label)
                .map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      backgroundColor:
                        appTheme === lightTheme
                          ? appTheme.palette.secondary.main
                          : appTheme.palette.primary.main,
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <StyledTableRow rowId={0}>
                <TableCell align="center" colSpan={5}>
                  No entries found
                </TableCell>
              </StyledTableRow>
            ) : (
              rows.map((row, index) => renderRow(row, index))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{
          backgroundColor:
            appTheme === lightTheme
              ? appTheme.palette.secondary.main
              : appTheme.palette.primary.main,
        }}
        component="div"
        count={totalEntriesCount}
        page={currentPage}
        rowsPerPageOptions={[1, 5, 10, 25]}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
