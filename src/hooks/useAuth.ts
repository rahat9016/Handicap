import { authService } from "@/services/auth";
import { IGenericErrorResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
export const useAuth = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.log("data", data);
      Cookies.set("accessToken", data.accessToken, { expires: 1 });
      Cookies.set("refreshToken", data.refreshToken, { expires: 2 });
      Cookies.set("userId", data.id, { expires: 1 });
      if (data.role === "DEVELOPER") {
        Cookies.set("isAdmin", "true");
      }

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