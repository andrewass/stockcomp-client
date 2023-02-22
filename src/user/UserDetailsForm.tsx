import {Box, Button, Modal, TextField} from "@mui/material";
import {useState} from "react";
import {useMutation} from "react-query";
import {queryClient} from "../config/queryConfig";
import toast from "react-hot-toast";
import {UserData} from "./userDetailTypes";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useApiWrapper} from "../config/apiWrapper";
import {updateUserDataConfig} from "./api/userApi";
import {makeStyles} from "@mui/styles";


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

type Props = {
    userData: UserData
}

export type UpdateUserInput = {
    username: number
    fullName: string
    country: string
}


export const UserDetailsForm = ({userData}: Props) => {
    const {root} = useFormStyles();
    const {handleSubmit, control} = useForm<UpdateUserInput>();
    const {apiPost} = useApiWrapper();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const mutation = useMutation({
        mutationFn: (userData: UpdateUserInput) => {
            return apiPost(updateUserDataConfig(userData))
        },
        onSuccess: () => queryClient.invalidateQueries("getUserDetails"),
        onError: () => {
            toast.error("Unable to update user details", {
                duration: 4000,
                position: "top-center"
            });
        }
    })

    const submitForm: SubmitHandler<UpdateUserInput> = data => {
        mutation.mutate(data);
    }


    return (
        <Box>
            <Button onClick={handleOpen}>Update</Button>
            <Modal open={open} onClose={handleClose}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <form className={root} onSubmit={handleSubmit(submitForm)}>
                        <Controller
                            name="username"
                            control={control}
                            rules={{required: "Username is required"}}
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    label="Username"
                                    variant="filled"
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <Controller
                            name="fullName"
                            control={control}
                            rules={{}}
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    label="Full Name"
                                    variant="filled"
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <Button variant="outlined" type="submit">
                            Update
                        </Button>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
}