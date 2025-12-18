import { postService } from "@/services/auth";
import { IGenericErrorResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
// export const usePatch = <T>(
//   onSuccess?: (data: T) => void,
//   invalidateQueriesKeys?: Array<string[]>
// ) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (params: { url: string; data: Record<string, unknown>  | FormData}) => {
//       return postService.patch(params.url, params.data);
//     },
//     onSuccess: (data) => {
//       if (invalidateQueriesKeys) {
//         invalidateQueriesKeys.forEach((key) => {
//           queryClient.invalidateQueries({ queryKey: key });
//         });
//       }
//       if (onSuccess) {
//         onSuccess(data);
//       }
//     },
//     onError: (error: IGenericErrorResponse) => {
//       toast.error(error.message || "Failed to update.");
//       throw error;
//     },
//   });
// };

type PatchArg =
  | {
      url: string;
      data: Record<string, unknown> | FormData;
      config?: AxiosRequestConfig;
    }
  | FormData
  | Record<string, unknown>;

export const usePatch = <T>(
  onSuccess?: (data: T) => void,
  invalidateQueriesKeys?: Array<string[]>,
  defaultEndpoint?: string
) => {
  const queryClient = useQueryClient();

  const isPatchObject = (
    a: PatchArg
  ): a is {
    url: string;
    data: Record<string, unknown> | FormData;
    config?: AxiosRequestConfig;
  } => typeof a === "object" && a !== null && "url" in a;

  return useMutation<T, IGenericErrorResponse, PatchArg>({
    mutationFn: (arg) => {
      if (isPatchObject(arg)) {
        const { url, data, config } = arg;
        if (!url) throw new Error("Patch endpoint is required");
        return postService.patch(url, data, config);
      }

      const url = defaultEndpoint;
      if (!url) throw new Error("Patch endpoint is required");
      return postService.patch(url, arg as Record<string, unknown> | FormData);
    },

    onSuccess: (data) => {
      invalidateQueriesKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      onSuccess?.(data);
    },

    onError: (error) => {
      toast.error(error.message || "Failed to update.");
      throw error;
    },
  });
};
