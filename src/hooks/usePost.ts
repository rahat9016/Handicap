import { postService } from "@/services/auth";
import { IGenericErrorResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
export const usePost = <T>(
  defaultEndpoint?: string,
  onSuccess?: (data: T) => void,
  invalidateQueriesKeys?: Array<string[]>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      arg:
        | FormData
        | Record<string, unknown>
        | { endpoint: string; data?: FormData | Record<string, unknown> }
    ) => {
      if (typeof arg === "object" && "endpoint" in arg) {
        return postService.request(
          arg.endpoint as string,
          (arg.data ?? {}) as FormData | Record<string, unknown>
        );
      }

      if (!defaultEndpoint) {
        throw new Error(
          "defaultEndpoint is required if endpoint is not provided"
        );
      }

      return postService.request(defaultEndpoint, arg);
    },
    onSuccess: (data) => {
      // toast.success(data.message);

      // Automatically refetch matching queries
      if (invalidateQueriesKeys) {
        invalidateQueriesKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }

      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: IGenericErrorResponse) => {
      console.log("POST error", error);
      toast.error(error.message || "Something went wrong.");
      throw error;
    },
  });
};
