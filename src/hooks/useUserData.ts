import { useQuery } from "@tanstack/react-query";
import { getUserAdmin, getUsers, } from "../api/api";

export const useUserData = () => {
    return useQuery({
        queryKey: ["allUserData"],
        queryFn: () => getUsers(),
    });
};

export const useUserAdminData = () => {
    return useQuery({
        queryKey: ["allUserAdminData"],
        queryFn: () => getUserAdmin(),
    });
};