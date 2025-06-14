import {Box, Link as MUILink, TableCell, TableRow, Typography} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import {Contest, contestStatusRecord, getStatusByColor} from "../../domain/contests/contestTypes";
import {formatDate} from "../../util/dateUtils";
import {createLink} from "@tanstack/react-router";
import {useThemeContext} from "../../theme/AppThemeContext";
import {lightTheme} from "../../theme/themes";

const CustomLink = createLink(MUILink);

export const ContestEntry = ({contest}: { contest: Contest }) => {
    const {appTheme} = useThemeContext();

    return (
        <TableRow key={contest.contestId}
                  sx={{backgroundColor: appTheme === lightTheme ? appTheme.palette.primary.main : appTheme.palette.secondary.main}}>
            <TableCell>
                <CustomLink to="/contests/$contestId" params={{contestId: contest.contestId.toString()}}>
                    {contest.contestName}
                </CustomLink>
            </TableCell>
            <TableCell>
                <Box display="flex" flexDirection="row">
                    <Typography>{contestStatusRecord[contest.contestStatus]}</Typography>
                    <CircleIcon sx={{color: getStatusByColor(contest), marginRight: 1}}/>
                </Box>
            </TableCell>
            <TableCell>{formatDate(contest.startTime)}</TableCell>
            <TableCell>{formatDate(contest.endTime)}</TableCell>
            <TableCell>{contest.contestId}</TableCell>
        </TableRow>
    );
}
