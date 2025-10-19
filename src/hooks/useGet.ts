/* eslint-disable @typescript-eslint/no-unused-vars */
import { axiosInstance } from "@/helpers/axios/axiosInstance";
import { IGenericErrorResponse } from "@/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface IGenericResponse<T> {
  data: T;
  meta?: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}


export const useGet = <T>(
  endpoint: string,
  queryKey: string[],
  queryParams?: Record<string, unknown>,
  options?: Omit<
    UseQueryOptions<
      IGenericResponse<T>,
      IGenericErrorResponse,
      IGenericResponse<T>,
      string[]
    >,
    "queryKey" | "queryFn"
  >
) => {
  // Remove empty params so queryKey doesn't get polluted
  const filteredParams = Object.fromEntries(
    Object.entries(queryParams || {}).filter(([_, value]) => {
      return value !== "" && value !== undefined && value !== null;
    })
  );

  const finalQueryKey = [
    ...queryKey,
    ...Object.values(filteredParams).map(String),
  ];

  return useQuery<
    IGenericResponse<T>,
    IGenericErrorResponse,
    IGenericResponse<T>,
    string[]
  >({
    queryKey: finalQueryKey,
    retry: false,
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(endpoint, { params: filteredParams });
        return response;
      } catch (error) {
        // if (error instanceof Error) {
        //   toast.error(error.message || "Failed to fetch data.");
        // } else {
        //   toast.error("Failed to fetch data.");
        // }
        throw error;
      }
    },
    enabled: options?.enabled ?? true,
    ...options,
  });
};
