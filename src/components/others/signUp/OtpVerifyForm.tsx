"use client";
import { Controller, useFormContext } from "react-hook-form";
import OtpInput from "react-otp-input";

export default function OtpVerifyForm({resendOTPHandler}: { resendOTPHandler: () => void }) {
  const { control } = useFormContext();
  
  
  return (
    <div className="mt-3">
      <Controller
          control={control}
          name="otp"
          render={({ field, fieldState }) => (
            <div className="w-full">
              <OtpInput
                value={field.value}
                onChange={field.onChange}
                numInputs={6}
                shouldAutoFocus
                containerStyle="flex justify-between gap-2 w-full"
                inputStyle={`border ${fieldState.error ? "border-red-500" : "border-gray-300"} !w-10 h-10 text-center rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                renderInput={(props) => <input {...props} placeholder="-" />}
              />
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={resendOTPHandler}
          className="text-blue underline text-sm "
        >
          Resend OTP
        </button>
      </div>
        
    </div>
  );
}
