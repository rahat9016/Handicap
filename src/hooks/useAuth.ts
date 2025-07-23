import { authService } from "@/services/auth";
import { storeUserInfo } from "@/services/auth.service";
import { IGenericErrorResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useAuth = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.log("data", data);

      storeUserInfo({ accessToken: data.accessToken });
      toast.success(data.message);
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: IGenericErrorResponse) => {
      toast.error(error.message);
    },
  });
};