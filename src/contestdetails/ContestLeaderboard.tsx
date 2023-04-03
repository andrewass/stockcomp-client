import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    useMediaQuery
} from "@mui/material";
import {styled, useTheme} from "@mui/material/styles";
import {ContestLeaderboardEntry} from "./ContestLeaderboardEntry";
import {useQuery} from "react-query";
import {useApiWrapper} from "../config/apiWrapper";
import {GET_SORTED_PARTICIPANTS, getSortedParticipantsConfig} from "../participant/api/participantApi";
import ErrorComponent from "../error/ErrorComponent";
import {Participant, ParticipantPage} from "../participant/participantTypes";
import {ChangeEvent, useState} from "react";


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#2196f3",
        color: theme.palette.common.white,
    }
}));

interface Props {
    contestNumber: number
}

export const ContestLeaderboard = ({contestNumber}: Props) => {
    const {apiGet} = useApiWrapper();
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("md"));
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [participantEntries, setParticipantEntries] = useState<Participant[]>([]);
    const [totalEntriesCount, setTotalEntriesCount] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(1);

    const fetchParticipantEntries = async (page: number, pageRowCount: number) => {
        const data = await apiGet(getSortedParticipantsConfig(contestNumber, page, pageRowCount));
        setTotalEntriesCount(data.totalEntriesCount);
        setParticipantEntries(data.participants);
        setCurrentPage(page);
        setRowsPerPage(pageRowCount);

        return data;
    }

    const {error, isLoading} = useQuery<ParticipantPage>([GET_SORTED_PARTICIPANTS, contestNumber],
        () => fetchParticipantEntries(currentPage, rowsPerPage)
    );

    const handlePageChange = (event: unknown, newPage: number) => {
        fetchParticipantEntries(newPage, rowsPerPage)
            .catch(error => console.log(error));
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        fetchParticipantEntries(0, +event.target.value)
            .catch(error => console.log(error));
    };

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    return (
        <Paper sx={{width: isLargeWidth ? "60%" : "95%", m: "0 auto", mt: "10%"}}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Ranking</StyledTableCell>
                            <StyledTableCell>Username</StyledTableCell>
                            <StyledTableCell>Country</StyledTableCell>
                            <StyledTableCell>Total Value</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {participantEntries!.map(participantEntry => <ContestLeaderboardEntry
                            entry={participantEntry} key={participantEntry.displayName}
                        />)}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                count={totalEntriesCount} page={currentPage}
                rowsPerPageOptions={[1, 5, 10, 25]}
                rowsPerPage={rowsPerPage} onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}