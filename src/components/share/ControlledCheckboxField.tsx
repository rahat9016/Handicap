import React from "react";

import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface FilterFormValues {
  sortBy: string;
  sectors: string[];
  resourceTypes: string[];
  languages: string[];
}

interface ControlledInputFieldProps {
  name: keyof FilterFormValues;
  options: { label: string; value: string }[];
}

const ControlledCheckboxField: React.FC<ControlledInputFieldProps> = ({
  name,
  options,
}) => {
  const { control } = useFormContext();

  return (
    <React.Fragment>
      <Controller
        control={control}
        name={name as string}
        render={({ field }) => {
          const currentValues = field.value || [];

          const handleCheckedChange = (checked: boolean, value: string) => {
            if (value === "all") {
              field.onChange(checked ? [] : []);
              return;
            }

            if (checked) {
              field.onChange([...currentValues, value]);
            } else {
              field.onChange(currentValues.filter((v: string) => v !== value));
            }
          };

          return (
            <div className="space-y-3">
              {options.map(({ label, value }) => (
                <div key={value} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    id={`${name}-${value}`}
                    checked={
                      value === "all"
                        ? currentValues.length === 0
                        : currentValues.includes(value)
                    }
                    onCheckedChange={(checked) =>
                      handleCheckedChange(!!checked, value)
                    }
                  />
                  <Label className="text-[#666666] cursor-pointer" htmlFor={`${name}-${value}`}>{label}</Label>
                </div>
              ))}
            </div>
          );
        }}
      />
    </React.Fragment>
  );
};

export default ControlledCheckboxField;
