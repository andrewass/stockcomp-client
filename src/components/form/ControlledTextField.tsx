import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { TextField } from "@mui/material";

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  rules?: Record<string, string>;
  defaultValue?: PathValue<T, Path<T>>;
  disabled?: boolean;
}

export default function ControlledTextField<T extends FieldValues>({
  name,
  label,
  control,
  rules,
  defaultValue,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => (
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
