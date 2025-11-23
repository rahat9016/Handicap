import ControlledInputField from "@/components/share/ControlledInputField";
import InputLabel from "@/components/share/InputLabel";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-6 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
        <div>
          <InputLabel label="First Name" required />
          <ControlledInputField
            name="firstName"
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <InputLabel label="Last Name" required />
          <ControlledInputField
            name="lastName"
            placeholder="Enter your last name"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 lg:gap-5">
        <div>
          <InputLabel label="Email" required />
          <ControlledInputField
            name="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <InputLabel label="Phone" required />
          <ControlledInputField
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <InputLabel label="Password" required />
          <div className="relative">
                      <ControlledInputField
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pr-10" 
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-black"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
        </div>
      </div>
    </div>
  );
}
