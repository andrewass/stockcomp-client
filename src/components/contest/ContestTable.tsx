import {
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
import {styled, useTheme} from '@mui/material/styles';
import {ContestEntry} from "./ContestEntry";
import {Contest} from "../../types/contest";


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#2196f3",
        color: theme.palette.common.white,
    }
}));

interface Props{
    contests: Contest[]
}

const ContestTable = ({contests}: Props) => {

    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <TableContainer component={Paper} sx={{width: isLargeWidth ? "60%" : "95%", m: "0 auto", mt: "10%"}}>
            <Table>
                <TableHead sx={{backgroundColor:"greenyellow"}}>
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

export default ContestTable;