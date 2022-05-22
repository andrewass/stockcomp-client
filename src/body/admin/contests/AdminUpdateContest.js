import {FormControl, InputLabel, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useStyles} from "../../authentication/SignUp";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {useMutation} from "react-query";
import {useLocation, useNavigate} from "react-router-dom";
import {updateContest} from "../adminClient";
import {queryClient} from "../../../config/queryConfig";
import MenuItem from "@mui/material/MenuItem";

const AdminUpdateContest = () => {

    const contest = useLocation().state;

    const navigate = useNavigate();
    const classes = useStyles();
    const [contestStatus, setContestStatus] = useState(contest.contestStatus);
    const [startTime, setStartTime] = useState(contest.startTime);

    const getUpdateContestRequest = () => {
        return {
            contestNumber: contest.contestNumber,
            contestStatus: contestStatus,
            startTime: startTime,
        }
    }

    const submitContestUpdate = async event => {
        event.preventDefault();
        updateContest(getUpdateContestRequest());
    }

    const updateMutation = useMutation(submitContestUpdate, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("getAllContests");
            navigate("/admin/contests");
        },
        onError: (error) => console.log(error)
    });

    return (
        <form className={classes.root} onSubmit={updateMutation.mutate}>
            <TextField label="Contest Number" variant="outlined" defaultValue={contest.contestNumber}
                       InputProps={{readOnly: true,}}
            />

            <FormControl disabled={updateMutation.isLoading}>
                <InputLabel>Operation</InputLabel>
                <Select value={contestStatus} label="Status"
                        onChange={event => setContestStatus(event.target.value)}>
                    <MenuItem value="Buy">Buy</MenuItem>
                    <MenuItem value="Sell">Sell</MenuItem>
                </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker disabled={updateMutation.isLoading}
                                renderInput={(props) => <TextField {...props} />}
                                label="Starting Time"
                                value={startTime}
                                onChange={newValue => setStartTime(newValue)}
                />
            </LocalizationProvider>

            <Button variant="outlined" sx={{mt: "1rem", maxWidth: "10rem"}} type="submit">
                Update
            </Button>
        </form>
    )
}

export default AdminUpdateContest;