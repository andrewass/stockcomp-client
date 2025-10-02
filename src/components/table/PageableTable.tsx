import {
	Box,
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import type React from "react";
import type { ReactNode } from "react";
import { useThemeContext } from "../../theme/AppThemeContext";
import { lightTheme } from "../../theme/themes";
import StyledTableRow from "./StyledTableRow";

export interface Column {
	id: string;
	label: string;
}

interface Props<T> {
	columns: Column[];
	rows: T[] | undefined;
	renderRow: (row: T, key: number) => ReactNode;
	page: number;
	rowsPerPage: number;
	totalEntriesCount: number | undefined;
	isLoading: boolean;
	onChangePage: (newPage: number) => void;
	onChangeRowsPerPage: (newRowsPerPage: number) => void;
}

export default function PageableTable<T>({
	columns,
	rows = [],
	renderRow,
	page,
	rowsPerPage,
	totalEntriesCount,
	isLoading,
	onChangePage,
	onChangeRowsPerPage,
}: Props<T>) {
	const { appTheme } = useThemeContext();

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		onChangeRowsPerPage(parseInt(event.target.value, 10));
	};

	function handlePageChange(
		event: React.MouseEvent<HTMLButtonElement> | null,
		page: number,
	) {
		onChangePage(page);
	}

	if (isLoading) return <CircularProgress />;

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
						{rows!.length === 0 ? (
							<StyledTableRow rowId={0}>
								<TableCell align="center" colSpan={columns.length}>
									No entries found
								</TableCell>
							</StyledTableRow>
						) : (
							rows!.map((row, index) => renderRow(row, index))
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
				count={totalEntriesCount!}
				page={page}
				rowsPerPageOptions={[1, 5, 10, 25]}
				rowsPerPage={rowsPerPage}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Box>
	);
}
