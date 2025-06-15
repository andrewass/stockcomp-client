import { Box, Grid, TableCell, TableRow } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import { Link } from "@tanstack/react-router";
import {
  LeaderboardEntry,
  Medal,
  MedalValue,
} from "../../leaderboard/leaderboardTypes";
import BronzeMedalIcon from "../../icons/BronzeMedalIcon";

const LeaderboardEntryRow = ({ entry }: { entry: LeaderboardEntry }) => {
  const getMedalCount = (medalValue: MedalValue, medals: Medal[]) => {
    return medals.filter((medal) => medal.medalValue === medalValue).length;
  };

  const getMedals = (medals: Medal[]) => {
    if (medals.length > 0) {
      return (
        <Box sx={{ width: "70px" }}>
          <Grid container rowSpacing={1} columnSpacing={2}>
            <Grid size={4}>
              <BronzeMedalIcon />
            </Grid>
            <Grid size={4}>
              <BronzeMedalIcon />
            </Grid>
            <Grid size={4}>
              <BronzeMedalIcon />
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
  };

  return (
    <TableRow key={entry.displayName}>
      <TableCell>{entry.ranking}</TableCell>
      <TableCell>
        <Link to="/users/$username" params={{ username: entry.displayName }}>
          {entry.displayName}
        </Link>
      </TableCell>
      <TableCell>
        <ReactCountryFlag
          style={{
            width: "2em",
            height: "2em",
          }}
          countryCode={entry.country}
          svg
        />
      </TableCell>
      <TableCell>{entry.score}</TableCell>
      <TableCell>{getMedals(entry.medals)}</TableCell>
    </TableRow>
  );
};

export default LeaderboardEntryRow;
