import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {FormEvent, useState} from "react";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";
import {createContest} from "../api/adminClient";
import {queryClient} from "../config/queryConfig";

const AdminCreateContest = () => {

    const navigate = useNavigate()
    const [number, setNumber] = useState<number>()
    const [startTime, setStartTime] = useState<string>()

    const getCreateContestRequest = () => {
        return {
            contestNumber: number,
            startTime: startTime,
        }
    }

    const submitContestCreation = async (event: FormEvent<HTMLElement>) => {
        event.preventDefault()
        createContest(getCreateContestRequest())
    }

    const createMutation = useMutation(submitContestCreation, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("getAllContests")
            navigate("/admin/contests")
        },
        onError: (error) => console.log(error)
    })

    return (
        <form onSubmit={createMutation.mutate}>
            <TextField label="Contest Number" variant="outlined" sx={{m: "1rem 0"}}
                       onChange={e => setNumber(parseInt(e.target.value))}/>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker disabled={createMutation.isLoading}
                                renderInput={(props) => <TextField {...props} />}
                                label="Starting Time"
                                value={startTime}
                                onChange={newValue => setStartTime(newValue!)}
                />
            </LocalizationProvider>

            <Button variant="outlined" sx={{m: "1rem 0", maxWidth: "10rem"}} type="submit">
                Create
            </Button>
        </form>
    )
}

export default AdminCreateContest