import ControlledInputField from "@/components/share/ControlledInputField";
import InputLabel from "@/components/share/InputLabel";

export default function ForgotPasswordForm() {
  return (
    <div className="flex flex-col gap-6 mt-8">
      <div className="grid grid-cols-1 gap-3 lg:gap-5">
        <div>
          <InputLabel label="Email" required />
          <ControlledInputField
            name="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
      </div>
    </div>
  );
}
