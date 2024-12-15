import {Controller} from "react-hook-form";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";

interface Props {
    name: string;
    label: string;
    control: any;
    disabled?: boolean;
    defaultValue?: string;
    rules?: any;
    items: Record<string, string>
}

export default function ControlledSelect({name, label, control, defaultValue, items}: Props) {
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