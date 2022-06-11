import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useStyles} from "../authentication/SignUp";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";
import {createContest} from "../../api/adminClient";
import {queryClient} from "../../config/queryConfig";

const AdminCreateContest = () => {

    const navigate = useNavigate();
    const classes = useStyles();
    const [number, setNumber] = useState();
    const [startTime, setStartTime] = useState();

    const getCreateContestRequest = () => {
        return {
            contestNumber: parseInt(number),
            startTime: startTime,
        }
    }

    const submitContestCreation = async event => {
        event.preventDefault();
        createContest(getCreateContestRequest());
    }

    const createMutation = useMutation(submitContestCreation, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("getAllContests");
            navigate("/admin/contests");
        },
        onError: (error) => console.log(error)
    });

    return (
        <form className={classes.root} onSubmit={createMutation.mutate}>
            <TextField label="Contest Number" variant="outlined" onChange={e => setNumber(e.target.value)}/>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker disabled={createMutation.isLoading}
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

export default AdminCreateContest;