import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { FormControl } from "@mui/material";
import StyledSelect from "../input/StyledSelect";

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  disabled?: boolean;
  defaultValue?: PathValue<T, Path<T>>;
  rules?: Record<string, string>;
  items: Record<string, string>;
}

export default function ControlledSelect<T extends FieldValues>({
  name,
  label,
  control,
  defaultValue,
  items,
}: Props<T>) {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => (
        <FormControl>
          <StyledSelect label={label} items={items} {...field} />
        </FormControl>
      )}
    />
  );
}
