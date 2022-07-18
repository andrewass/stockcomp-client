import {FormControl, InputLabel, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {FormEvent, useState} from "react";
import {useStyles} from "../components/authentication/SignUp";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {useMutation} from "react-query";
import {useLocation, useNavigate} from "react-router-dom";
import {updateContest} from "../api/adminClient";
import {queryClient} from "../config/queryConfig";
import MenuItem from "@mui/material/MenuItem";
import {contestStatusMap} from "../util/constants";
import {Contest} from "../types/contest";


const AdminUpdateContest = () => {

    const {state} = useLocation()
    const navigate = useNavigate()
    const classes = useStyles()
    const contest = state as Contest

    const [contestStatus, setContestStatus] = useState(contestStatusMap.get(contest.contestStatus))
    const [startTime, setStartTime] = useState(contest.startTime)

    function getStatusCode(value: string) {
        return [...contestStatusMap].find(([key, val]) => val === value)![0]
    }

    const getUpdateContestRequest = () => {
        return {
            contestNumber: contest.contestNumber,
            contestStatus: getStatusCode(contestStatus!),
            startTime: startTime,
        }
    }

    const submitContestUpdate = async (event : FormEvent<HTMLElement>) => {
        event.preventDefault()
        updateContest(getUpdateContestRequest())
    }

    const updateMutation = useMutation(submitContestUpdate, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("getAllContests")
            navigate("/admin/contests")
        },
        onError: (error) => console.log(error)
    })

    return (
        <form className={classes.root} onSubmit={updateMutation.mutate}>
            <TextField label="Contest Number" variant="outlined" defaultValue={contest.contestNumber}
                       InputProps={{readOnly: true}} sx={{mt:"1rem"}}
            />

            <FormControl disabled={updateMutation.isLoading} sx={{m:"1rem 0"}}>
                <InputLabel>Status</InputLabel>
                <Select value={contestStatus} label="Status"
                        onChange={event => setContestStatus(event.target.value)}>
                    {[...contestStatusMap].map(([key, val]) => <MenuItem key={val} value={val}>{val}</MenuItem>)}
                </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker disabled={updateMutation.isLoading}
                                renderInput={(props) => <TextField {...props} />}
                                label="Starting Time" value={startTime}
                                onChange={newValue => setStartTime(newValue as string)}
                />
            </LocalizationProvider>

            <Button variant="outlined" sx={{m: "1rem 0", maxWidth: "10rem"}} type="submit">
                Update
            </Button>
        </form>
    )
}

export default AdminUpdateContest