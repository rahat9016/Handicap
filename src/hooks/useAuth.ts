import { authService } from "@/services/auth";
import { IGenericErrorResponse } from "@/types";
import { encryptData } from "@/utils/cryptoHelper";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
export const useAuth = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      const encryptedId = encryptData(String(data.id), "ABC123!@#");
      const encryptedRoleId = encryptData(String(data.roleId), "ABC123!@#");

       // 🔑 If parentRoleId exists, set adminPermission = true
      const encryptedAdminPermission = encryptData(
        data?.parentRoleId ? "true" : "false",
        "ABC123!@#"
      );

      Cookies.set("accessToken", data.accessToken, { expires: 1 });
      Cookies.set("refreshToken", data.refreshToken, { expires: 2 });
      Cookies.set("userId", encryptedId, { expires: 1 });
      Cookies.set("roleId", encryptedRoleId, { expires: 1 });
      Cookies.set("adminPermission", encryptedAdminPermission, { expires: 1 });
      
      // Set admin cookie if the user is a developer
      if (data.role === "DEVELOPER") Cookies.set("isAdmin", "true");

      toast.success(data.message);
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: IGenericErrorResponse) => {
      toast.error(error.message);
      throw error;
    },
  });
};