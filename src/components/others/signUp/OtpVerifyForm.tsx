"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FormProvider, useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { otpSchema } from "./Schema/Signup";

export default function OtpVerifyForm({ email }: { email: string }) {
  const methods = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  const { control, handleSubmit } = methods;

  

  const handleResend = () => {
    // sendOtp.mutate(email);
  };

  const onSubmit = async (data: { email: string; otp: string }) => {
    try {
        console.log(data)
      alert("OTP verified successfully", );
    } catch (error) {
      console.error("OTP verification error", error);
    }
  };


  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-sm text-gray-600">OTP sent to: <strong>{email}</strong></p>

        <Controller
          control={control}
          name="otp"
          render={({ field, fieldState }) => (
            <div>
              <OtpInput
                value={field.value}
                onChange={field.onChange}
                numInputs={6}
                shouldAutoFocus
                containerStyle="flex gap-2 justify-center"
                inputStyle="border border-gray-300 w-10 h-10 text-center rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                renderInput={(props) => <input {...props} />}
              />
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <button
          type="button"
          onClick={handleResend}
          className="text-sm text-blue-600 underline"
        >
          Resend OTP
        </button>

        <button
          type="submit"
          className="bg-green-600 text-white w-full p-2 rounded"
        >
          Verify OTP
        </button>
      </form>
    </FormProvider>
  );
}
