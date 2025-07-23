import ControlledInputField from "@/components/share/ControlledInputField";
import InputLabel from "@/components/share/InputLabel";

export default function UserInformationForm() {
  return (
    <div>
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
            <ControlledInputField
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
