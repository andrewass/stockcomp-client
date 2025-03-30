import {Box, Button, MenuItem, Modal, Select, TextField} from "@mui/material";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "../config/queryConfig";
import toast from "react-hot-toast";
import {AccountData} from "./accountDetailTypes";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useApiWrapper} from "../config/useApiWrapper";
import {GET_ACCOUNT_DETAILS, updateAccountDataConfig} from "./api/accountApi";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

/*
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

 */

type Props = {
    accountData: AccountData
}

export type UpdateAccountInput = {
    username: string
    fullName: string
    country: string
}


export const AccountDetailsForm = ({accountData}: Props) => {
    const {handleSubmit, control} = useForm<UpdateAccountInput>({
        defaultValues: {
            username: accountData.username,
            fullName: accountData.fullName,
            country: accountData.country
        }
    });
    const {apiPost} = useApiWrapper();
    const [open, setOpen] = useState(false);

    countries.registerLocale(enLocale);
    const countriesObject = countries.getNames("en");

    const mutation = useMutation({
        mutationFn: (accountData: UpdateAccountInput) => {
            return apiPost(updateAccountDataConfig(accountData))
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: [GET_ACCOUNT_DETAILS]}),
        onError: () => {
            toast.error("Unable to update account details", {
                duration: 4000,
                position: "top-center"
            });
        }
    })

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const submitForm: SubmitHandler<UpdateAccountInput> = data => {
        mutation.mutate(data);
    }

    return (
        <Box>
            <Button onClick={handleOpen}>Update</Button>
            <Modal open={open} onClose={handleClose}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <form onSubmit={handleSubmit(submitForm)}>
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

                        <Controller
                            name="country"
                            defaultValue="US"
                            control={control}
                            render={({field}) => (
                                <Select {...field}>
                                    {Object.entries(countriesObject).map(([key, val]) =>
                                        <MenuItem key={val} value={key}>{val}</MenuItem>)}
                                </Select>
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
