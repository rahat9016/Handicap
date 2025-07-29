"use client"
import { useGet } from "@/hooks/useGet";
import { setUserId, setUserInformation } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const UserFetcher = () => {
  const dispatch = useAppDispatch();
  const userId = Cookies.get("userId");

  const { data, isSuccess } = useGet(
  `/user/${userId}`,
  ["user", userId || ""],
  undefined,
  {
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  }
);

  useEffect(() => {
    if (userId) {
      dispatch(setUserId(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (isSuccess && data?.data) {
      dispatch(setUserInformation(data.data));
    }
  }, [isSuccess, data, dispatch]);

  return null; 
};