/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useGet } from "@/hooks/useGet";
import {
  setLoading,
  setUserId,
  setUserInformation,
} from "@/lib/redux/features/auth/authSlice";
import { setOrganization } from "@/lib/redux/features/organizer/organizationSlice";
import {
  setAdminOrganizationPermission,
  setPermission,
} from "@/lib/redux/features/permission/permissionSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { decryptData } from "@/utils/cryptoHelper";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const UserFetcher = () => {
  const dispatch = useAppDispatch();
  const userId = Cookies.get("userId");
  const roleId = Cookies.get("roleId");
  const queryClient = useQueryClient();
  const organizationData = Cookies.get("organizationData");
  const decryptedUserId = decryptData(userId ?? "", "ABC123!@#");
  const decryptedRoleId = decryptData(roleId ?? "", "ABC123!@#");

  const { data, isSuccess, isLoading } = useGet(
    `/user/${decryptedUserId}`,
    ["user", decryptedUserId || ""],
    undefined,
    {
      enabled: !!decryptedUserId,
      staleTime: 5 * 60 * 1000,
    }
  );

  // If userId is available, set it in the store
  useEffect(() => {
    if (decryptedUserId) {
      dispatch(setUserId(decryptedUserId));
    }
  }, [decryptedUserId, dispatch]);

  // If roleId is available, set permission based on it
  // If roleId is "1", set permission to true
  useEffect(() => {
    if (decryptedRoleId === "1") {
      dispatch(setPermission(true));
    } else if (decryptedRoleId === "2") {
      dispatch(setAdminOrganizationPermission(true));
    }
  }, [decryptedRoleId, dispatch]);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  // If user data is available, set it in the store
  useEffect(() => {
    // dispatch(setLoading(isLoading));
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

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event?.query?.queryKey?.[0] === "user") {
        const latest = queryClient.getQueryData<any>(["user", decryptedUserId]);
        if (latest?.data) {
          dispatch(setUserInformation(latest.data));
        }
      }
    });
    return () => unsubscribe();
  }, [queryClient, decryptedUserId, dispatch]);

  useAnalytics();

  return null;
};
