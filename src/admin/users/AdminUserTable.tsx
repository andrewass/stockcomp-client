import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {AdminUserRow} from "./AdminUserRow";
import {StyledTableCell} from "../../styles/components/StyledTableCell";
import {ChangeEvent, useState} from "react";
import {useApiWrapper} from "../../config/apiWrapper";
import {CircularProgress, TablePagination, useMediaQuery, useTheme} from "@mui/material";
import {GET_ALL_USERS_ADMIN, getAllUsersSortedConfig} from "../api/adminApi";
import {useQuery} from "@tanstack/react-query";
import {User, UserPage} from "../../user/userTypes";
import ErrorComponent from "../../error/ErrorComponent";


export const AdminUserTable = () => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("md"));
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [userEntries, setUserEntries] = useState<User[]>([]);
    const [totalEntriesCount, setTotalEntriesCount] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(1);
    const {apiGet} = useApiWrapper();

    const fetchUserEntries = async (page: number, pageRowCount: number) => {
        const data = await apiGet(getAllUsersSortedConfig(page, pageRowCount));
        setTotalEntriesCount(data.totalEntriesCount);
        setUserEntries(data.users);
        setCurrentPage(page);
        setRowsPerPage(pageRowCount);

        return data;
    }

    const {isLoading, error, data: users} = useQuery<UserPage>(
        [GET_ALL_USERS_ADMIN],
        () => fetchUserEntries(currentPage, rowsPerPage)
    );

    const handlePageChange = (event: unknown, newPage: number) => {
        fetchUserEntries(newPage, rowsPerPage)
            .catch(error => console.log(error));
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        fetchUserEntries(0, +event.target.value)
            .catch(error => console.log(error));
    }

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    return (
        <Paper sx={{width: isLargeWidth ? "60%" : "95%", m: "0 auto", mt: "10%"}}>
            <TableContainer component={Paper} sx={{mt: "10%"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Username</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>User Type</StyledTableCell>
                            <StyledTableCell>User Status</StyledTableCell>
                            <StyledTableCell>Edit</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userEntries.map(user => <AdminUserRow key={user.email} user={user}/>)}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div" count={totalEntriesCount}
                page={currentPage} rowsPerPageOptions={[1, 5, 10, 25]}
                rowsPerPage={rowsPerPage} onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}