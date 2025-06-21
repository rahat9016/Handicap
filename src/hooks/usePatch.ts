import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IGenericErrorResponse } from "@/types";
import { postService } from "@/services/auth";

export const usePatch = <T>(endpoint: string, onSuccess?: (data: T) => void) => {
    return useMutation({
        mutationFn: (data: Record<string, unknown>) => postService.patch(endpoint, data),
        onSuccess: (data) => {
            toast.success(data.message || "Updated successfully!");
            if (onSuccess) {
                onSuccess(data);
            }
        },
        onError: (error: IGenericErrorResponse) => {
            toast.error(error.message || "Failed to update.");
        },
    });
};
