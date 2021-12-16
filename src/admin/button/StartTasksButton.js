import React from 'react';
import Button from "@mui/material/Button";
import toast, {Toaster} from "react-hot-toast";
import {startInvestmentProcessing, startOrderProcessing} from "../../service/adminService";

const StartTasksButton = () => {

    const handleClick = (event) => {
        event.stopPropagation();
        startOrderProcessing();
        startInvestmentProcessing();
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

export default StartTasksButton;