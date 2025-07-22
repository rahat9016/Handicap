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
  invalidateQueriesKeys?: Array<string | string[]>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData | Record<string, unknown>) =>
      postService.request(endpoint, data),
    onSuccess: (data) => {
      toast.success(data.message);

      // Invalidate provided query keys if any
      if (invalidateQueriesKeys) {
        invalidateQueriesKeys.forEach((key) => {
          const queryKey: readonly unknown[] = typeof key === "string" ? [key] : key;
          queryClient.invalidateQueries({ queryKey, exact: true });
        });
      }

      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: IGenericErrorResponse) => {
      toast.error(error.message);
    },
  });
};
