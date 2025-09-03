import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface ControlledCheckFieldProps {
  name: string;
  label: string;
}

export function ControlledCheckField({ name, label }: ControlledCheckFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={name}
            checked={!!field.value} // 🔑 ensure boolean
            onCheckedChange={(checked) => field.onChange(!!checked)}
          />
          <Label htmlFor={name} className="text-[#666666] cursor-pointer">
            {label}
          </Label>
        </div>
      )}
    />
  );
}