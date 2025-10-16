import { ErrorType } from "@/types";
const ErrorMessage = ({ error }: { error?: ErrorType }) => {
  if (!error) return null;
  return (
    <div className="text-rose-600 bg-rose-200 text-center py-2 rounded-sm font-inter text-sm">
      {error.errors?.[0] || error.message || "Something went wrong!"}
    </div>
  );
};

export default ErrorMessage;
