import Button from "@mui/material/Button";
import {completeContestTasks} from "../../service/adminService";
import toast, {Toaster} from "react-hot-toast";

export const CompleteTasksButton = ({record}) => {

    const handleClick = (event) => {
        event.stopPropagation();
        completeContestTasks(record.contestNumber);
        toast.success("Complete contest tasks initiated", {
            duration: 4000,
            position: "top-center"
        });
    }

    return (
        <>
            <Button label="Approve" onClick={handleClick}>
                Complete tasks
            </Button>
            <Toaster/>
        </>
    );
}