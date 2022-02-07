import Button from "@mui/material/Button";
import toast, {Toaster} from "react-hot-toast";
import {startContestTasks} from "../../service/adminService";

export const StartTasksButton = () => {

    const handleClick = (event) => {
        event.stopPropagation();
        startContestTasks().catch(error => console.log(error));
        toast.success("Start tasks initiated", {
            duration: 4000,
            position: "top-center"
        });
    }

    return (
        <>
            <Button label="Approve" onClick={handleClick}>
                Start Tasks
            </Button>
            <Toaster/>
        </>
    );
}