/* eslint-disable @typescript-eslint/no-unused-vars */
// import { axiosInstance } from "@/helpers/axios/axiosInstance";
// import { useQuery } from "@tanstack/react-query";
// import { toast } from "react-toastify";


// export const useGet = <T>(endpoint: string, queryKey?: string, enabled = true) => {
//     return useQuery<T>({
//         queryKey: [queryKey || endpoint], // Ensuring unique keys per API
//         queryFn: async () => {
//             try {
//                 const response = await axiosInstance.get(endpoint);
//                 return response.data;
//             } catch (error) {
//                 console.error(`Error fetching ${endpoint}:`, error);
//                 toast.error("Failed to fetch data");
//                 throw error;
//             }
//         },
//         enabled, // Useful to control when to fetch
//     });
// };



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
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(endpoint, { params: filteredParams });
        return response;
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message || "Failed to fetch data.");
        } else {
          toast.error("Failed to fetch data.");
        }
        throw error;
      }
    },
    ...options,
  });
};

// const { isLoading, data: allAdminUserData, refetch } = useGet("/users", ["allUserAdminData"]);

// const userId = 1;
// const { isLoading, data: userData, refetch } = useGet(`/users/${userId}`, ["userData", userId]);

// const queryParams = { role: "admin" };
// const { isLoading, data: filteredUsers, refetch } = useGet("/users", ["filteredUsers", queryParams], queryParams);