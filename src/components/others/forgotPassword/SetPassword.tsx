import ControlledInputField from "@/components/share/ControlledInputField";
import InputLabel from "@/components/share/InputLabel";

export default function SetPassword() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <InputLabel label="Password" required />
        <ControlledInputField
          name="password"
          type="password"
          placeholder="Enter your password"
        />
      </div>
      <div>
        <InputLabel label="Confirm password" required />
        <ControlledInputField
          name="confirmPassword"
          type="password"
          placeholder="Enter your confirm password"
        />
      </div>
    </div>
  );
}
