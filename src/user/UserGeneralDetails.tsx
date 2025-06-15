import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { UserExtended } from "./userTypes";
import ReactCountryFlag from "react-country-flag";

export const UserGeneralDetails = ({
  userData,
}: {
  userData: UserExtended;
}) => {
  return (
    <Box sx={{ width: "400px", m: "0 auto", mt: "80px" }}>
      <Card>
        <CardContent>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: deepPurple[500],
            }}
          >
            OP
          </Avatar>
          <Typography sx={{ mt: "20px" }}>
            Username: {userData!.username}
          </Typography>
          <Typography sx={{ mt: "20px" }}>
            Full name : {userData!.fullName ? userData!.fullName : "N/A"}
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            sx={{ mt: "20px" }}
            alignItems="center"
          >
            <Typography sx={{ mr: "5px" }}>Country :</Typography>
            <ReactCountryFlag
              style={{
                width: "2em",
                height: "2em",
              }}
              countryCode={userData!.country}
              svg
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
