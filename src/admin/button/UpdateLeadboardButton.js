import React from 'react';
import Button from "@mui/material/Button";
import {updateLeaderboard} from "../../service/adminService";
import toast, {Toaster} from "react-hot-toast";

const UpdateLeaderboardButton = ({record}) => {

    const handleClick = (event) => {
        event.stopPropagation();
        updateLeaderboard(record.contestNumber);
        toast.success("Leaderboard update initiated", {
            duration: 4000,
            position: "top-center"
        });
    }

    return (
        <>
            <Button label="Approve" onClick={handleClick}>
                Update Leaderboard
            </Button>
            <Toaster/>
        </>
    );
}

export default UpdateLeaderboardButton;