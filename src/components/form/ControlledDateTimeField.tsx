import { Control, Controller, FieldValues, Path } from "react-hook-form";
import StyledDateTimeField from "../input/StyledDateTimeField";

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  disabled?: boolean;
  rules?: Record<string, string>;
}

export default function ControlledDateTimeField<T extends FieldValues>({
  name,
  label,
  control,
  disabled,
  rules,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <StyledDateTimeField
          value={field.value ?? null}
          label={label}
          onChange={field.onChange}
          disabled={disabled}
        />
      )}
    />
  );
}
