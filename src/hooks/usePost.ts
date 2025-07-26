import { postService } from "@/services/auth";
import { IGenericErrorResponse } from "@/types";
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { toast } from "react-toastify";

export const usePost = <T>(
  endpoint: string,
  onSuccess?: (data: T) => void,
  invalidateQueriesKeys?: Array<string[]>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData | Record<string, unknown>) =>
      postService.request(endpoint, data),
    onSuccess: (data) => {
      toast.success(data.message);

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
      toast.error(error.message || "Something went wrong.");
    },
  });
};
