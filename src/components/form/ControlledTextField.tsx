import {Controller} from "react-hook-form";
import {TextField} from "@mui/material";

interface Props {
    name: string,
    label: string,
    control: any,
    rules?: any,
    defaultValue: string | number
}

export default function ControlledTextField({name, label, control, rules, defaultValue}: Props) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={rules}
            render={({field, fieldState}) => (
                <TextField
                    {...field}
                    label={label}
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                />
            )}
        />
    );
}
