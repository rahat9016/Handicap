import { IGenericErrorResponse } from "@/types";

type ErrorType = IGenericErrorResponse | null | undefined;
const ErrorMessage = ({ error }: { error?: ErrorType }) => {
  if (!error?.errors?.length) return null;
  return (
    <div className="text-rose-600 bg-rose-200 text-center py-2 rounded-sm font-inter text-sm">
      {error.errors[0]}
    </div>
  );
};

export default ErrorMessage;
