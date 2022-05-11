import {getSortedParticipants} from "../../../service/participantService";
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery
} from "@mui/material";
import {styled, useTheme} from "@mui/material/styles";
import {ContestLeaderboardEntry} from "./ContestLeaderboardEntry";
import {useQuery} from "react-query";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#2196f3",
        color: theme.palette.common.white,
    }
}));

export const ContestLeaderboard = ({contestNumber}) => {

    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("md"));

    const fetchParticipantRanking = () => {
        return getSortedParticipants(contestNumber);
    }

    const {error, isLoading, data} = useQuery("getParticipantRanking", fetchParticipantRanking);

    if (isLoading) return <CircularProgress/>

    if (error) return `Error! ${error}`;

    return (
        <TableContainer component={Paper} sx={{width: isLargeWidth ? "60%" : "95%", m: "0 auto", mt: "10%"}}>
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
                    {data.map(entry => <ContestLeaderboardEntry entry={entry} key={entry.username}/>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}