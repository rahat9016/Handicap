import { authKey } from "@/constants/auth/storageKey";
import { axiosInstance } from "@/helpers/axios/axiosInstance";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { decodedToken } from "./jwt";
import { getBaseUrl } from "@/config/envConfig";
import { refreshDelete } from "@/actions/cookiesAction";
import { redirect } from "next/navigation";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken as string);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  // console.log(authToken);
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export async function logout() {
  // Delete the refresh token from cookies
  await refreshDelete();

  // Remove user-specific information from localStorage
  removeUserInfo("accessToken"); // Replace "userInfo" with the actual key you use

  // Redirect to the home page
  redirect("/");
}

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${getBaseUrl()}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
