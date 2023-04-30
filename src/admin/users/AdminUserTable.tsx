import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {AdminUserRow} from "./AdminUserRow";
import {StyledTableCell} from "../../styles/components/StyledTableCell";
import {useNavigate} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import {useApiWrapper} from "../../config/apiWrapper";
import {CircularProgress, useTheme} from "@mui/material";
import {GET_ALL_USERS_ADMIN, getAllUsersSorted} from "../api/adminApi";
import {useQuery} from "@tanstack/react-query";
import {User, UserPage} from "../../user/userTypes";
import ErrorComponent from "../../error/ErrorComponent";


export const AdminUserTable = () => {

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [userEntries, setUserEntries] = useState<User[]>([]);
    const [totalEntriesCount, setTotalEntriesCount] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(1);
    const {apiGet} = useApiWrapper();
    const theme = useTheme();

    const fetchUserEntries = async (page: number, pageRowCount: number) => {
        const data = await apiGet(getAllUsersSorted(currentPage, rowsPerPage));
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
        <TableContainer component={Paper} sx={{mt: "10%"}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Contest Number</StyledTableCell>
                        <StyledTableCell>Start time</StyledTableCell>
                        <StyledTableCell>Contest Status</StyledTableCell>
                        <StyledTableCell>Leaderboard Update Status</StyledTableCell>
                        <StyledTableCell>Edit</StyledTableCell>
                        <StyledTableCell>Delete</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userEntries.map(user => <AdminUserRow key={user.email} user={user}/>)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}