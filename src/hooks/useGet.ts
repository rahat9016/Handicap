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



import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IGenericErrorResponse } from "@/types";
import { axiosInstance } from "@/helpers/axios/axiosInstance";

export const useGet = <T>(endpoint: string, queryKey: string[], queryParams?: Record<string, unknown>) => {
    return useQuery<T, IGenericErrorResponse>({
        queryKey: queryKey,
        queryFn: async () => {
            try {
                const response = await axiosInstance.get(endpoint, { params: queryParams });
                return response.data;
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message || "Failed to fetch data.");
                } else {
                    toast.error("Failed to fetch data.");
                }
                throw error;
            }
        },
    });
};

// const { isLoading, data: allAdminUserData, refetch } = useGet("/users", ["allUserAdminData"]);

// const userId = 1;
// const { isLoading, data: userData, refetch } = useGet(`/users/${userId}`, ["userData", userId]);

// const queryParams = { role: "admin" };
// const { isLoading, data: filteredUsers, refetch } = useGet("/users", ["filteredUsers", queryParams], queryParams);