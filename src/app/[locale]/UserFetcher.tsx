"use client"
import { useGet } from "@/hooks/useGet";
import { setLoading, setUserId, setUserInformation } from "@/lib/redux/features/auth/authSlice";
import { setOrganization } from "@/lib/redux/features/organizer/organizationSlice";
import { setPermission } from "@/lib/redux/features/permission/permissionSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const UserFetcher = () => {
  const dispatch = useAppDispatch();
  const userId = Cookies.get("userId");
  const roleId = Cookies.get("roleId");
  const organizationData = Cookies.get("organizationData");

  const { data, isSuccess, isLoading } = useGet(
  `/user/${userId}`,
  ["user", userId || ""],
  undefined,
  {
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  }
);

  // If userId is available, set it in the store
  useEffect(() => {
    if (userId) {
      dispatch(setUserId(userId));
    }
  }, [userId, dispatch]);

  // If roleId is available, set permission based on it
  // If roleId is "1", set permission to true
  useEffect(() => {
    if (roleId === "1") {
      dispatch(setPermission(true));
    }
  }, [roleId, dispatch]);


  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  // If user data is available, set it in the store
  useEffect(() => {
    dispatch(setLoading(isLoading));
    if (isSuccess && data?.data) {
      dispatch(setUserInformation(data.data));
    }
  }, [isSuccess, data, dispatch, isLoading]);
  
  // If organization data is available in cookies, parse and set it in the store
  useEffect(() => {
    if (organizationData) {
      const parsedData = JSON.parse(organizationData);
      dispatch(setOrganization(parsedData));
    }
  }, [organizationData, dispatch]);

  return null; 
};