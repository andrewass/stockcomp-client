import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useStyles} from "../../authentication/SignUp";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {useMutation} from "react-query";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {createContest} from "../adminClient";

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

    const submitContestCreation  = async event => {
        event.preventDefault();
        await createContest(getCreateContestRequest());
        navigate("/admin/contests");
    }

    const mutation = useMutation(submitContestCreation, {
        onSuccess: () => {
            toast.success("Successfully created contest", {duration: 4000, position: "top-center"});
        },
        onError: () => {
            toast.error("Unable to create contest", {duration: 4000, position: "top-center"});
        },
    });

    return (
        <form className={classes.root} onSubmit={submitContestCreation}>
            <TextField label="Contest Number" variant="outlined" onChange={e => setNumber(e.target.value)}/>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker disabled={mutation.isLoading}
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