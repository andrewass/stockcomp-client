import { Card, CardContent, Stack, Tooltip, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import React from "react";
import {
  Contest,
  contestStatusRecord,
  getStatusByColor,
} from "../../../domain/contests/contestTypes";
import { formatDate } from "../../../util/dateUtils";
import { Link } from "@tanstack/react-router";
import { useThemeContext } from "../../../theme/AppThemeContext";

interface Props {
  contest: Contest;
}

const RegisteredContest = ({ contest }: Props) => {
  const { appTheme } = useThemeContext();

  return (
    <Card>
      <CardContent>
        <Stack gap={1}>
          <Stack direction="row" gap={0.5}>
            <Typography
              component={Link}
              to={`/contests/${contest.contestId}`}
              sx={{
                textDecoration: "none",
                color: appTheme.palette.primary.contrastText,
              }}
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
          </Stack>
          <Typography>Ending {formatDate(contest.endTime)}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RegisteredContest;
