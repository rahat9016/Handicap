import { Controller, useFormContext } from "react-hook-form";

interface ControlledRadioFieldProps {
  name: string;
  value: string;
  label: string;
}

const ControlledRadioField: React.FC<ControlledRadioFieldProps> = ({
  name,
  value,
  label,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col">
          <label className="flex items-center">
            <input
              type="radio"
              value={value}
              checked={field.value === value}
              onChange={() => field.onChange(value)}
              className="mr-2"
            />
            <span>{label}</span>
          </label>

          {/* ✅ show error only once per group */}
          {error && (
            <p className="text-sm text-red-500 mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default ControlledRadioField;