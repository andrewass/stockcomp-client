import React, {useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {getData} from "country-list";
import toast, {Toaster} from "react-hot-toast";
import Button from "@mui/material/Button";
import {updateUserDetails} from "../../service/userService";

const countries = getData();

const UserAccountWrite = ({userDetails}) => {

    const [country, setCountry] = useState(userDetails.country);
    const [fullName, setFullName] = useState(userDetails.fullName);

    const submitUpdatedUserDetails = async () => {
        await updateUserDetails(userDetails.username, fullName, country)
            .catch(error => console.log(error));
        toast.success("User details successfully updated", {
            duration: 4000,
            position: "top-center"
        });
    }

    return (
        <Box sx={{display:"flex", flexDirection:"column", width:"25%", mt:"3rem"}}>
            <TextField label={userDetails.fullName ? userDetails.fullName : "Full Name"}
                       onChange={event => setFullName(event.target.value)}/>
            <FormControl sx={{mt:"3rem"}}>
                <InputLabel>Country</InputLabel>
                <Select value={country ? country : countries[0].name}
                        label="Country"
                        onChange={event => setCountry(event.target.value)}
                        sx={{minWidth: "15rem"}}>
                    {countries.map((country) => (
                        <MenuItem value={country.name}>
                            {country.name ? country.name : "Select value"}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="outlined" sx={{mt: "1rem", maxWidth: "10rem"}} onClick={() => submitUpdatedUserDetails()}>
                Update
            </Button>
            <Toaster/>
        </Box>

    );
}

export default UserAccountWrite;