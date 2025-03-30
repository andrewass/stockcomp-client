import {Control, Controller, FieldValues, Path, PathValue} from "react-hook-form";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

interface Props<T extends FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    disabled?: boolean;
    defaultValue?: PathValue<T, Path<T>>;
    rules?: Record<string, string>;
    items: Record<string, string>
}

export default function ControlledSelect<T extends FieldValues>(
    {name, label, control, defaultValue, items}: Props<T>
) {
    return (
        <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            render={({field}) => (
                <FormControl>
                    <InputLabel>{label}</InputLabel>
                    <Select label={label} {...field}>
                        {Object.entries(items).map(([key, val]) =>
                            <MenuItem key={val} value={key}>{val}</MenuItem>)}
                    </Select>
                </FormControl>
            )}
        />
    );
}
