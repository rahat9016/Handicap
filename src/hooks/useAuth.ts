import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { storeUserInfo } from "@/services/auth.service";
import { authService } from "@/services/auth";
import { IGenericErrorResponse } from "@/types";

export const useAuth = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.log("data", data);

      storeUserInfo({ accessToken: data.access_token });
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