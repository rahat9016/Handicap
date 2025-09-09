import { useFormContext } from "react-hook-form";

const ControlledRadioField = ({ 
  name, 
  value, 
  label 
}: { 
  name: string; 
  value: string; 
  label: string; 
}) => {
  const { register } = useFormContext();
  
  return (
    <div className="flex items-center">
      <input
        type="radio"
        {...register(name)}
        value={value}
        className="mr-2"
      />
      <span>{label}</span>
    </div>
  );
};

export default ControlledRadioField;