import {Box, Grid, TableCell, TableRow} from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import {LeaderboardEntry, Medal, MedalValue} from "./leaderboardTypes";
import goldMedal from "../icons/gold-medal.svg";
import silverMedal from "../icons/silver-medal.svg";
import bronzeMedal from "../icons/bronze-medal.svg";
import {Link} from "@tanstack/react-router";


const LeaderboardEntryRow = ({entry}: { entry: LeaderboardEntry }) => {

    const getMedalCount = (medalValue: MedalValue, medals: Medal[]) => {
        return medals.filter(medal => medal.medalValue === medalValue).length;
    }

    const getMedals = (medals: Medal[]) => {
        if (medals.length > 0) {
            return (
                <Box sx={{width: "70px"}}>
                    <Grid container rowSpacing={1} columnSpacing={2}>
                        <Grid size={4}>
                            <Box
                                component="img"
                                sx={{height: 30, width: 40}}
                                alt="Gold medal"
                                src={goldMedal}
                            />
                        </Grid>
                        <Grid size={4}>
                            <Box
                                component="img"
                                sx={{height: 30, width: 40}}
                                alt="Silver medal"
                                src={silverMedal}
                            />
                        </Grid>
                        <Grid size={4}>
                            <Box
                                component="img"
                                sx={{height: 30, width: 40}}
                                alt="Bronze medal"
                                src={bronzeMedal}
                            />
                        </Grid>
                        <Grid size={4}>
                            <p>{getMedalCount(MedalValue.Gold, medals)}</p>
                        </Grid>
                        <Grid size={4}>
                            <p>{getMedalCount(MedalValue.Silver, medals)}</p>
                        </Grid>
                        <Grid size={4}>
                            <p>{getMedalCount(MedalValue.Bronze, medals)}</p>
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
                <Link style={{textDecoration: "none", color: "black"}} to={`/user/${entry.displayName}`}>
                    {entry.displayName}
                </Link>
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

export default LeaderboardEntryRow;
