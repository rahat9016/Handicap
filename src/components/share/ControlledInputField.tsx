import React, { ReactElement } from "react";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

interface ControlledInputFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: ReactElement<any, any>;
}

const ControlledInputField: React.FC<ControlledInputFieldProps> = ({
  name,
  type,
  placeholder,
  className,
  icon,
}) => {
  const { control } = useFormContext();

  return (
    <div className="relative">
      {icon && (
        <span>
          {icon}
        </span>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <Input
              type={type}
              {...field}
              value={field.value ?? ""}
              placeholder={placeholder}
              error={error?.message}
              className={className}
              showErrorMessage={!!error}
            />
          );
        }}
      />
    </div>
  );
};

export default ControlledInputField;
