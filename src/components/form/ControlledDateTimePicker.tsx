import {DateTimePicker} from "@mui/x-date-pickers";
import {Control, Controller, FieldValues, Path} from "react-hook-form";

interface Props<T extends FieldValues> {
    name: Path<T>,
    label: string,
    control: Control<T>,
    disabled?: boolean,
    defaultValue?: string
    rules?: Record<string, string>,
}


export default function ControlledDateTimePicker<T extends FieldValues>(
    {name, label, control, disabled, defaultValue, rules}: Props<T>
) {
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
