import {DateTimePicker} from "@mui/x-date-pickers";
import {Controller} from "react-hook-form";

interface Props {
    name: string,
    label: string,
    control: any,
    disabled?: boolean,
    defaultValue?: string
    rules?: any,
}


export default function ControlledDateTimePicker({name, label, control, disabled, defaultValue, rules}: Props) {
    const parsedValue = defaultValue ? new Date(defaultValue) : null;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({field: {onChange}}) => (
                <DateTimePicker
                    value={parsedValue}
                    onChange={onChange}
                    label={label}
                    disabled={disabled}
                />
            )}
        />
    );
}
