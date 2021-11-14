import React, {useEffect, useState} from "react";
import {getParticipantRanking} from "../../../service/contestService";
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
import ContestLeaderboardEntry from "./ContestLeaderboardEntry";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#2196f3",
        color: theme.palette.common.white,
    }
}));

const ContestLeaderboard = ({contestNumber}) => {

    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("md"));

    const [leaderboard, setLeaderboard] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getLeaderboard = async () => {
        const response = await getParticipantRanking(contestNumber);
        setLeaderboard(response.data);
        setIsLoading(false);
    }

    useEffect(() => {
        getLeaderboard().catch(error => console.log(error))
    }, [])

    if (isLoading) {
        return <CircularProgress/>
    }
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
                    {leaderboard.map(entry => <ContestLeaderboardEntry entry={entry}/>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ContestLeaderboard;