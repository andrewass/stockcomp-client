import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {Box, IconButton, Modal} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import {makeStyles} from "@mui/styles";
import {useApiWrapper} from "../../config/apiWrapper";
import {GET_ALL_USERS_ADMIN, getUpdateContestConfig} from "../api/adminApi";
import {queryClient} from "../../config/queryConfig";
import {User} from "../../user/userTypes";

export type UpdateContestInput = {
    contestNumber: number,
    startTime: string,
    contestStatus: string,
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const useFormStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2px",

        '& .MuiTextField-root': {
            margin: "20px",
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: "20px",
        },
    },
}));


export const AdminUpdateUserForm = ({user}: { user: User }) => {
    const {root} = useFormStyles();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const {handleSubmit, control} = useForm<UpdateContestInput>();
    const {apiPut} = useApiWrapper();

    const mutation = useMutation({
        mutationFn: (contestData: UpdateContestInput) => {
            return apiPut(getUpdateContestConfig(contestData));
        },
        onSuccess: () => {
            queryClient.invalidateQueries([GET_ALL_USERS_ADMIN])
                .then(() => navigate("/admin/users"));
        }
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submitForm: SubmitHandler<UpdateContestInput> = data => {
        mutation.mutate(data);
    }

    return (
        <Box>
            <IconButton onClick={handleOpen}>
                <EditIcon/>
            </IconButton>
            <Modal open={open} onClose={handleClose}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">
                <Box className={root} component="form" onSubmit={handleSubmit(submitForm)} sx={style} maxWidth="500px">
                    <Button type="submit" sx={{mt: "1rem"}}>
                        Update
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}