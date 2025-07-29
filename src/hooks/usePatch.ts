import { postService } from "@/services/auth";
import { IGenericErrorResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const usePatch = <T>(
  onSuccess?: (data: T) => void,
  invalidateQueriesKeys?: Array<string[]>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { url: string; data: Record<string, unknown>  | FormData}) => {
      return postService.patch(params.url, params.data);
    },
    onSuccess: (data) => {
      toast.success(data.message || "Updated successfully!");
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
      toast.error(error.message || "Failed to update.");
      throw error;
    },
  });
};
