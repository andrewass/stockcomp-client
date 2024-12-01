import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {TextField} from "@mui/material";
import {Controller} from "react-hook-form";

interface Props {
    name: string,
    label: string,
    control: any,
    disabled: boolean
}


export default function ControlledDateTimePicker({name, label, control, disabled}:Props){
    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        {...field}
                        label={label}
                        disabled={disabled}
                        renderInput={(props) => <TextField {...props} fullWidth/>}
                    />
                </LocalizationProvider>
            )}
        />
    );
}
