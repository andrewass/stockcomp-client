import { Box, Tooltip, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import React from "react";
import {
  Contest,
  contestStatusRecord,
  getStatusByColor,
} from "../../../domain/contests/contestTypes";
import { formatDate } from "../../../util/dateUtils";
import { Link } from "@tanstack/react-router";

interface Props {
  contest: Contest;
}

const RegisteredContest = ({ contest }: Props) => {
  return (
    <React.Fragment>
      <Box display="flex" flexDirection="row">
        <Typography
          component={Link}
          to={`/contests/${contest.contestId}`}
          sx={{ textDecoration: "none", color: "black" }}
        >
          {contest.contestName}
        </Typography>
        <Tooltip
          title={contestStatusRecord[contest.contestStatus]}
          placement="top"
        >
          <CircleIcon
            sx={{ color: getStatusByColor(contest), marginRight: 1 }}
          />
        </Tooltip>
      </Box>
      <Typography>Ending {formatDate(contest.endTime)}</Typography>
    </React.Fragment>
  );
};

export default RegisteredContest;
