import React from 'react';
import Button from "@mui/material/Button";
import toast, {Toaster} from "react-hot-toast";
import {stopContestTasks} from "../../service/adminService";

const StopTasksButton = () => {

    const handleClick = (event) => {
        event.stopPropagation();
        stopContestTasks().catch(error => console.log(error));
        toast.success("Stop tasks initiated", {
            duration: 4000,
            position: "top-center"
        });
    }

    return (
        <>
            <Button label="Approve" onClick={handleClick}>
                Stop Tasks
            </Button>
            <Toaster/>
        </>
    );
}

export default StopTasksButton;