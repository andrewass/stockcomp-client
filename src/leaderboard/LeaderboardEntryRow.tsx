import {Box, Grid, TableCell, TableRow} from "@mui/material";
import {NavLink} from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import {LeaderboardEntry, Medal} from "./leaderboardTypes";

interface Props {
    entry: LeaderboardEntry
}

const LeaderboardEntryRow = ({entry}: Props) => {

    const getMedals = (medals: Medal[]) => {
        if (medals.length > 0) {
            return (
                <Box sx={{width: "45px"}}>
                    <Grid container rowSpacing={1} columnSpacing={{xs: 2, sm: 2, md: 2}}>
                        <Grid item xs={4} md={4} >
                            <p>2</p>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <p>2</p>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <p>2</p>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <p>2</p>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <p>2</p>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <p>2</p>
                        </Grid>
                    </Grid>
                </Box>
            );
        } else {
            return <></>;
        }
    }


    return (
        <TableRow key={entry.displayName}>
            <TableCell>{entry.ranking}</TableCell>
            <TableCell>
                <NavLink to={`/user/${entry.displayName}`}>
                    {entry.displayName}
                </NavLink>
            </TableCell>
            <TableCell>
                <ReactCountryFlag style={{
                    width: "2em",
                    height: "2em",
                }} countryCode={entry.country} svg/>
            </TableCell>
            <TableCell>{entry.score}</TableCell>
            <TableCell>{getMedals(entry.medals)}</TableCell>
        </TableRow>
    );
}

export default LeaderboardEntryRow