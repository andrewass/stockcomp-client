import {Paper, Table, TableBody, TableContainer, TableHead, TableRow, useMediaQuery} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import { StyledTableCell } from "../styles/components/StyledTableCell";
import {ContestEntry} from "./ContestEntry";
import {Contest} from "./contestTypes";

interface Props {
    contests: Contest[]
}

export const ContestTable = ({contests}: Props) => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <TableContainer component={Paper} sx={{width: isLargeWidth ? "60%" : "95%", m: "0 auto", mt: "10%"}}>
            <Table>
                <TableHead sx={{backgroundColor: "greenyellow"}}>
                    <TableRow>
                        <StyledTableCell>Contest</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Start Date</StyledTableCell>
                        <StyledTableCell>Participants</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contests.map(contest => <ContestEntry key={contest.contestNumber} contest={contest}/>)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}